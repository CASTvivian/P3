import { SubLocation } from "./YZ_Constant";
import CompatibleTool from "./CompatibleTool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_ListView extends cc.Component {

    _scrollView: cc.ScrollView = null;
    _content: cc.Node = null;
    _itemObj: cc.Node = null;

    _visibleCount: number = 5;
    _totalCount: number = 0;

    _itemSize: cc.Size = cc.size(0, 0);
    _spaceX: number = 0;
    _bannerSize: cc.Size = cc.size(0, 0);

    _itemArray: cc.Node[] = [];

    _curOffsetX: number = 0;
    _minOffsetX: number = 0;
    _maxOffsetX: number = 0;

    // 起始位置的索引值
    _startIndex: number = 0;
    // 滑动方向 -1 向左， 1 向右
    _scrollDir: number = 0;

    // 交叉推广数据,数组
    _recommendData: any = null;
    _dataDirty: boolean = false;
    _isInit: boolean = false;
    _isScorllBar: boolean = false; //是否滚动条

    public _location: SubLocation = null; //显示位置


    onLoad() {
        this._scrollView = this.getComponent(cc.ScrollView);
        this._content = this._scrollView.content;
        this._itemObj = cc.find("GamePage", this._content);
        this._itemSize = this._itemObj.getContentSize();
        this._startIndex = 0;
        this._bannerSize = this.node.getContentSize();
    }

    onEnable() {
        this._scrollView.node.on("scrolling", this.OnScroll, this);
        this._scrollView.node.on("scroll-ended", this.onScrollEnded, this);
    }

    onDisable() {
        this._scrollView.node.targetOff(this);
    }

    _itemPosX: number = 0;
    _itemtmp: cc.Node = null;
    _itemToCenterLength: number = 0;
    _percent: number = 1;
    update(dt: number) {
        if (this._isInit) {
            if (this._scrollView) {
                if (this._scrollView.isScrolling) {
                    for (let i = 0; i < this._itemArray.length; i++) {
                        this._itemtmp = this._itemArray[i];
                        this._itemToCenterLength = Math.abs(this._itemtmp.x + this._content.x - this._bannerSize.width * 0.5);
                        if ((this._itemSize.width - this._itemToCenterLength) > 0) {
                            this._percent = (this._itemSize.width - this._itemToCenterLength) / this._itemSize.width;
                            // if (!this._isScorllBar) {
                            //     this._itemtmp.scale = 1 + this._percent * 0.2;
                            // }
                        } else {
                            if (!this._isScorllBar) {
                                this._itemtmp.scale = 1;
                            }
                        }
                    }
                }
            }

            this.autoScroll(dt);
        }

        if (this._dataDirty) {
            this._dataDirty = false;
            this._updateContent();
        }
    }

    public init(data: any, isScorllBar: boolean = false) {
        if (data) {
            this._recommendData = data;
            this._totalCount = data.length;
            this._dataDirty = true;
            this._isScorllBar = isScorllBar;
            if (this._isScorllBar) {
                this._location = SubLocation.isScrollbar;
                this._autoScrollInterval = 0.3;
            } else {
                this._location = SubLocation.isYzBanner;
            }
        }
    }

    private _updateContent() {
        // 初始化content大小
        let num: number = this._recommendData.length;
        this._content.setContentSize(cc.size(this._itemSize.width * num, this._itemSize.height));
        this.InitObjs();
    }

    InitObjs() {
        let obj: cc.Node = null;
        for (let i = 0; i < this._totalCount; i++) {
            obj = cc.instantiate(this._itemObj);
            obj.x = this._spaceX * 0.5 + this._itemSize.width * 0.5 + this._itemSize.width * i + this._spaceX * i;
            obj.y = 0;
            obj.getComponentInChildren("GameItem").init(this._recommendData[i], this._location);
            this._content.addChild(obj);
            this._itemArray.push(obj);
        }

        let unvisibleCount: number = this._totalCount - this._visibleCount;
        this._maxOffsetX = (this._spaceX + this._itemSize.width) * unvisibleCount * -1;

        this._itemObj.destroy();

        this._isInit = true;
    }

    OnScroll(scrollview: cc.ScrollView, eventType: cc.ScrollView.EventType, customEventData: any) {
        this._content.stopAllActions();
        this._canAutoScroll = false;

        if (this._scrollView.getScrollOffset().x < this._curOffsetX) {
            this._scrollDir = -1;
        } else {
            this._scrollDir = 1;
        }
        this._curOffsetX = this._scrollView.getScrollOffset().x;

        if (this._scrollView.getScrollOffset().x == 0) {
            // utils.showLog("到达最左端......");
            // 向右滑动，到达最左端
            this._arriveLeft();
        } else if (this._scrollView.getScrollOffset().x == this._maxOffsetX) {
            // utils.showLog("到达最右端......");
            // 向左滑动，到达最右端
            this._arriveRight();
        }

    }

    onScrollEnded(scrollview: cc.ScrollView, eventType: cc.ScrollView.EventType, customEventData: any) {
        let stopIdx: number = 0;
        let tmp: number = Math.abs(this._curOffsetX) % (this._itemSize.width + this._spaceX);
        if (tmp > (this._itemSize.width + this._spaceX) * 0.5) {
            // 前进一格
            stopIdx = Math.ceil(Math.abs(this._curOffsetX) / (this._itemSize.width + this._spaceX));
        } else {
            // 后退一格
            stopIdx = Math.floor(Math.abs(this._curOffsetX) / (this._itemSize.width + this._spaceX));
        }
        let posX: number = (this._itemSize.width + this._spaceX) * stopIdx * -1;
        this._curOffsetX = posX;
        this.scroll(posX, 0.3);
    }

    _arriveLeft() {
        this._scrollView.setContentPosition(CompatibleTool.position(this._maxOffsetX, 0));
        this._curOffsetX = this._maxOffsetX;
        this._startIndex = (this._visibleCount + this._startIndex) % this._totalCount;
        this.refreshItem();
    }

    _arriveRight() {
        this._scrollView.setContentPosition(CompatibleTool.position(0, 0));
        this._curOffsetX = 0;
        this._startIndex = (this._startIndex + this._totalCount - this._visibleCount) % this._totalCount;
        this.refreshItem();
    }

    private refreshItem() {
        let posIdx: number = 0;
        let obj: cc.Node = null;
        for (let i = 0; i < this._totalCount; i++) {
            posIdx = (this._totalCount - this._startIndex + i) % this._totalCount;
            obj = this._itemArray[i];
            obj.x = this._spaceX * 0.5 + this._itemSize.width * 0.5 + this._spaceX * posIdx + this._itemSize.width * posIdx;
        }
    }

    _canAutoScroll: boolean = true;
    _autoScrollInterval: number = 2.5;
    _timeTmp: number = 0;
    autoScroll(dt: number) {
        if (this._canAutoScroll) {
            this._timeTmp += dt;
            if (this._timeTmp >= this._autoScrollInterval) {
                this._timeTmp = 0;
                let posX: number = this._curOffsetX - this._itemSize.width - this._spaceX;
                this._curOffsetX = posX;
                this._scrollDir = -1;
                if (this._isScorllBar) {
                    this.scroll(posX, 0);
                } else {
                    this.scroll(posX, 0.5);
                }

            }
        } else {
            this._timeTmp = 0;
        }
    }

    scroll(posX: number, duration: number) {
        this._content.runAction(cc.sequence(cc.moveTo(duration, CompatibleTool.position(posX, 0)), cc.callFunc(() => {
            this._canAutoScroll = true;
            if (this._scrollDir == 1 && this._curOffsetX == 0) {
                this._arriveLeft();
            } else if (this._scrollDir == -1 && this._curOffsetX == this._maxOffsetX) {
                this._arriveRight();
            }
        })));
    }
}
