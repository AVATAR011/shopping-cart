import { Tooltip } from "neetoui";

const TooltipWrapper = ({showTooltip, children, ...toolTipProps}) =>{
    if(!showTooltip) return children;

    return(
        <Tooltip {...toolTipProps}>
            <div>{children}</div>
        </Tooltip>
    );
};

export default TooltipWrapper;