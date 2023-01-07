import React from "react";
import { Button, Flex, Group, Select, Text } from "@mantine/core";
import { IconChevronDown, IconFileImport } from "@tabler/icons";
import { useActionsStyle } from "./useActionSectionStyle";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ActionProps } from "./IActions";
import { matrix } from "../../utils/moviesName";

export const Actions: (props: ActionProps) => ReactJSXElement = ({
  onBtnClick,
  onSortClick,
  sortDisabled,
}) => {
  const { classes, theme } = useActionsStyle();

  return (
    <>
      <Flex
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        my="md"
      >
        <Flex justify="center" direction={{ base: "column", sm: "row" }}>
          <Button
            variant="outline"
            mx="xs"
            my={{ base: "xs", sm: "0" }}
            radius="md"
            leftIcon={<IconFileImport />}
            onClick={() => onBtnClick(matrix.Simple)}
          >
            See all "Matrix"
          </Button>
          <Button
            variant="outline"
            mx="xs"
            my={{ base: "xs", sm: "0" }}
            radius="md"
            leftIcon={<IconFileImport />}
            onClick={() => onBtnClick(matrix.Reloaded)}
          >
            See all "Matrix Reloaded"
          </Button>
          <Button
            variant="outline"
            mx="xs"
            my={{ base: "xs", sm: "0" }}
            radius="md"
            leftIcon={<IconFileImport />}
            onClick={() => onBtnClick(matrix.Revolutions)}
          >
            See all "Matrix Revolutions"
          </Button>
        </Flex>
        <Flex justify={"center"} mt={{ base: "xs", md: "0" }}>
          <Group spacing={5}>
            <Text size="sm" color={theme.primaryColor}>
              Sort by
            </Text>
            <Select
              disabled={sortDisabled}
              color={theme.primaryColor}
              size="sm"
              data={[
                { value: "year-asc", label: "Year Ascending" },
                { value: "year-desc", label: "Year Descending" },
              ]}
              placeholder="Option"
              variant="unstyled"
              onChange={e => e && onSortClick(e.split('-')[0],e.split('-')[1])}
              rightSection={
                <IconChevronDown
                  color={theme.colors.blue[4]}
                  stroke={3}
                  size={12}
                />
              }
              classNames={{ input: classes.inputSelect }}
            />
          </Group>
        </Flex>
      </Flex>
    </>
  );
};
