
const { ccclass, property } = cc._decorator;


export enum EaseType {
    none = 0,
    easeIn,
    easeOut,
    easeInOut,
    easeExponentialIn,
    easeExponentialOut,
    easeExponentialInOut,
    easeSineIn,
    easeSineOut,
    easeSineInOut,
    easeElasticIn,
    easeElasticOut,
    easeElasticInOut,
    easeBounceIn,
    easeBounceOut,
    easeBounceInOut,
    easeBackIn,
    easeBackOut,
    easeBackInOut,
    easeBezierAction,
    easeQuadraticActionIn,
    easeQuadraticActionOut,
    easeQuadraticActionInOut,
    easeQuarticActionIn,
    easeQuarticActionOut,
    easeQuarticActionInOut,
    easeQuinticActionIn,
    easeQuinticActionOut,
    easeQuinticActionInOut,
    easeCircleActionIn,
    easeCircleActionOut,
    easeCircleActionInOut,
    easeCubicActionIn,
    easeCubicActionOut,
    easeCubicActionInOut
}

@ccclass
export default class QEasing extends cc.Component {

    @property({ type: cc.Enum(EaseType) })
    easeType: EaseType = EaseType.none;

    protected _getEase() {
        switch (this.easeType) {
            case EaseType.none: {
                return "linear";
            }
            case EaseType.easeOut: {
                return "easeOut";
            }
            case EaseType.easeInOut: {
                return "easeInOut";
            }
            case EaseType.easeExponentialIn: {
                return "easeExponentialIn";
            }
            case EaseType.easeExponentialOut: {
                return "easeExponentialOut";
            }
            case EaseType.easeExponentialInOut: {
                return "easeExponentialInOut";
            }
            case EaseType.easeSineIn: {
                return "sineIn";
            }
            case EaseType.easeSineOut: {
                return "sineOut";
            }
            case EaseType.easeSineInOut: {
                return "sineInOut";
            }
            case EaseType.easeElasticIn: {
                return "elasticIn";
            }
            case EaseType.easeElasticOut: {
                return "elasticOut";
            }
            case EaseType.easeElasticInOut: {
                return "elasticInOut";
            }
            case EaseType.easeBounceIn: {
                return "bounceIn";
            }
            case EaseType.easeBounceOut: {
                return "bounceOut";
            }
            case EaseType.easeBackIn: {
                return "backIn";
            }
            case EaseType.easeBackOut: {
                return 'backOut';
            }
            case EaseType.easeBackInOut: {
                return "backInOut";
            }
            case EaseType.easeQuadraticActionIn: {
                return "quadraticActionIn";
            }
            case EaseType.easeQuadraticActionOut: {
                return "quadraticActionOut";
            }
            case EaseType.easeQuadraticActionInOut: {
                return "quadraticActionInOut";
            }
            case EaseType.easeQuarticActionIn: {
                return "quarticActionIn";
            }
            case EaseType.easeQuarticActionOut: {
                return "quarticActionOut";
            }
            case EaseType.easeQuarticActionInOut: {
                return "quarticActionInOut";
            }
            case EaseType.easeQuinticActionIn: {
                return "quinticActionIn";
            }
            case EaseType.easeQuinticActionOut: {
                return "quinticActionOut";
            }
            case EaseType.easeQuinticActionInOut: {
                return "quinticActionInOut";
            }
            case EaseType.easeCircleActionIn: {
                return "easeCircleActionIn";
            }
            case EaseType.easeCircleActionOut: {
                return "circleActionOut";
            }
            case EaseType.easeCircleActionInOut: {
                return "circleActionInOut";
            }
            case EaseType.easeCubicActionIn: {
                return "cubicActionIn";
            }
            case EaseType.easeCubicActionOut: {
                return "cubicActionOut";
            }
            case EaseType.easeCubicActionInOut: {
                return "cubicActionInOut";
            }
        }
    }

}
