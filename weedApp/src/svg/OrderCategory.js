import * as React from "react";
import Svg, { Path } from "react-native-svg";

const OrderCategory = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M30 15c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15Z"
            fill="#D7BB7B"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m11.932 21.825 2.403 1.184v.003a1.5 1.5 0 0 0 1.329 0l2.404-1.187 2.37.953a1.5 1.5 0 0 0 2.062-1.39V9.75a2.25 2.25 0 0 0-2.25-2.25H9.75A2.25 2.25 0 0 0 7.5 9.75v11.638a1.5 1.5 0 0 0 2.063 1.391l2.369-.954ZM15 21.664l-2.4-1.189a1.516 1.516 0 0 0-1.23-.045L9 21.388V9.75A.75.75 0 0 1 9.75 9h10.5a.75.75 0 0 1 .75.75v11.638l-2.37-.959a1.511 1.511 0 0 0-1.226.046L15 21.664ZM11.25 16.5V15h7.5v1.5h-7.5Zm0-4.5v1.5h7.5V12h-7.5Z"
            fill="#fff"
        />
    </Svg>
);

export default OrderCategory;
