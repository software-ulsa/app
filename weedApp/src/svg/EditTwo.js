import * as React from "react";
import Svg, { Path } from "react-native-svg";

const EditTwo = (props) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m10.59 4.41 1.08-1.08a1.123 1.123 0 0 0-.002-1.593L10.26.33a1.127 1.127 0 0 0-1.592 0l-1.08 1.08a.281.281 0 0 0 0 .399l2.603 2.601a.281.281 0 0 0 .398 0ZM.505 8.491 6.66 2.338c.11-.11.29-.11.4 0l2.602 2.601a.281.281 0 0 1 0 .399l-6.154 6.155-2.848.499a.563.563 0 0 1-.652-.652l.498-2.848Zm2.402-.524a.327.327 0 0 1 0-.464l3.605-3.612a.328.328 0 0 1 .464.463L3.372 7.968a.327.327 0 0 1-.464 0Zm.279 1.971H2.061l.001-1.126h-.85l-.266 1.512.729.729 1.512-.263v-.852Z"
            fill="#C8C8C8"
            fillOpacity={1}
        />
    </Svg>
);

export default EditTwo;
