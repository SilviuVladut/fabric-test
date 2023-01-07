import React from "react";
import {Header} from "@mantine/core"
import {useHeaderStyle} from "./useHeaderStyle";
import {HeaderProps} from "./IHeader";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";


export const CustomHeader: (props: HeaderProps) => ReactJSXElement = ({logo}) => {
    const {classes} = useHeaderStyle();
    return (<>
        <Header height={80} mb="md" className={classes.container} bg="gray.0">
            <a href="/" className={classes.logo}>
                <img alt="fabric-logo" src={logo}/>
            </a>
        </Header>
    </>)
};
