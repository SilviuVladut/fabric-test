import {createStyles} from "@mantine/core";

export const useHeaderStyle = createStyles ( (theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        height: "50%",
        img: {
            height: "100%"
        }
    }
}) );
