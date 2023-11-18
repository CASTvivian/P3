import { cocosz } from "../Framework/CocosZ";
import { ZindexLayer } from "../Framework/Constant";
import { gameMgr } from "./gameMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class setMap extends cc.Component {
    @property([cc.SpriteFrame])
    dmmArr: cc.SpriteFrame[] = [];

    dikuai: cc.Node = null;

    protected onLoad(): void {
        gameMgr.setMapTs = this;
        // 躲猫猫图片
        gameMgr.dmmArr = this.dmmArr;
        // 地块
        this.dikuai = this.node.getChildByName("dikuai");
        if (this.dikuai) {
            this.dikuai.zIndex = cc.macro.MIN_ZINDEX;
        }
        // 获取坐标
        if ([1, 2, 4].includes(cocosz.gameMode) && this.node.getChildByName("point")) {
            let point = this.node.getChildByName("point");
            for (let i = 0; i < point.childrenCount; i++) {
                gameMgr.posList[i] = i;
            }
        }
    }

    protected onDestroy(): void {
        gameMgr.setMapTs = null;;
    }

    protected start(): void {
        for (let i = 0; i < this.node.children.length; i++) {
            // 初始zindex
            const child = this.node.children[i];
        }
    }


    time: number = -1;
    lateUpdate() {
        if (cocosz.isPause || gameMgr.isWin || gameMgr.isFail) return;
        if (this.time++ % 30 == 0) {
            this.checkAllNode();
        }
    }

    mainCameraPos: cc.Vec2 = cc.Vec2.ZERO;
    distanceX: number = 2500;
    distanceY: number = 1500;
    checkAllNode() {
        if (gameMgr && gameMgr.mainCamereRootNode) {
            this.mainCameraPos = gameMgr.mainCamereRootNode.getPosition();
            this.distanceX = cc.winSize.width / 2 / gameMgr.mainCamera.zoomRatio + 500;
            this.distanceY = cc.winSize.height / 2 / gameMgr.mainCamera.zoomRatio + 500;
        }
        // 地图节点
        let excludeArr = ["guide", "guidePath", "player", "colllider", "dikuai", "point", "itemPoint", "tree", "tipLayer", "jingyanLayer", "posLayer"];
        for (let i = 0; i < this.node.childrenCount; i++) {
            let child = this.node.children[i];
            if (excludeArr.includes(child.name) == false) {
                this.checkNode(child)
            }
        }
        // 地图地块
        let dikuai = this.node.getChildByName("dikuai");
        if (dikuai) {
            for (let i = 0; i < dikuai.childrenCount; i++) {
                let child = dikuai.children[i];
                this.checkNode(child);
            }
        }
    }

    checkNode(n: cc.Node, isRefresh: boolean = false) {
        if (isRefresh) {
            if (gameMgr && gameMgr.mainCamereRootNode) {
                this.mainCameraPos = gameMgr.mainCamereRootNode.getPosition();
                this.distanceX = cc.winSize.width / 2 / gameMgr.mainCamera.zoomRatio + 500;
                this.distanceY = cc.winSize.height / 2 / gameMgr.mainCamera.zoomRatio + 500;
            }
        }
        if (n && n.isValid && n.activeInHierarchy) {
            if (n.parent.name == this.node.name || n.parent.name == "dikuai") {
                if (n.opacity == 0 || n.opacity == 255) {
                    if (((n.x + n.width * Math.abs(n.scaleX) / 2) < (this.mainCameraPos.x - this.distanceX)) || ((n.x - n.width * Math.abs(n.scaleX) / 2) > (this.mainCameraPos.x + this.distanceX) ||
                        (n.y + n.height * Math.abs(n.scaleY) / 2) < (this.mainCameraPos.y - this.distanceY)) || ((n.y - n.height * Math.abs(n.scaleY) / 2) > (this.mainCameraPos.y + this.distanceY)
                        )) {
                        n.opacity = 0;
                        return false;
                    } else {
                        n.opacity = 255;
                        return true;
                    }
                }
            }
        }
    }

    // 释放资源节点
    release(call: Function) {
        // 删除dikaui子节点
        if (this.dikuai && this.dikuai.isValid && this.dikuai.childrenCount) {
            for (let i = 0; i < 2; i++) {
                let child = this.dikuai.children[i];
                if (child && child.isValid) {
                    child.destroy();
                }
            }
            setTimeout(() => { this.release(call); });
        }
        // 删除普通节点
        else if (this.node.childrenCount) {
            for (let i = 0; i < 10; i++) {
                let child = this.node.children[i];
                if (child && child.isValid) {
                    child.destroy();
                }
            }
            setTimeout(() => { this.release(call); });
        }
        // 结束后回调
        else {
            call && call();
        }
    }
}
