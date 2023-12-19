import { SVGProps } from "react";

interface PlusCircleProps extends SVGProps<SVGSVGElement> {
    fill?: string;
    stroke?: string;
}

const PlusCircle = ({ fill = "none", stroke = "white", ...props }: PlusCircleProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="plus-circle">
            <path id="Icon" d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke={stroke} strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>

);
export default PlusCircle;
