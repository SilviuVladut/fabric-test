import React from "react";
import { Card, Image, Group, Text, Badge} from "@mantine/core";
import {CustomCardProps} from "./ICustomCard";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

export const CustomCard:(props: CustomCardProps) => ReactJSXElement = ({title, poster, year, imdbID}) => {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder m="xl">
            <Card.Section>
                <Image
                    src={poster}
                    height={350}
                    alt={title}
                    fit="fill"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{title}</Text>
                <Badge color="blue" variant="light">
                    {year}
                </Badge>
            </Group>

            <Text size="sm" color="dimmed" align='center'>
               imdbID: {imdbID}
            </Text>
        </Card>
    );

}
