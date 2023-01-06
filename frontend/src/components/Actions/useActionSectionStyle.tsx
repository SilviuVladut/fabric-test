import {createStyles} from "@mantine/core";

export const useActionsStyle = createStyles ( (theme) => ({
    inputSelect: {
        width: "auto",
        color: theme.colors.blue[6],
        fontWeight: 800,
        '&::placeholder': {
            color: theme.colors.blue[6],
        },
    },
}));
