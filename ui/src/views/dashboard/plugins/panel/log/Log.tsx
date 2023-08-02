// Copyright 2023 Datav.io Team
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState } from "react";
import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react"
import { Panel, PanelProps } from "types/dashboard"
import { LogSeries } from "types/plugins/log";
import { dateTimeFormat } from "utils/datetime/formatter";
import { toNumber } from "lodash";
import CollapseIcon from "components/icons/Collapse";


interface LogPanelProps extends PanelProps {
    data: LogSeries[][]
}

const LogPanel = (props: LogPanelProps) => {
    const data: LogSeries[] = props.data.flat()
    if (data.length === 0) {
        return
    }
    console.log("here333333", data)
    return (<VStack alignItems="left" divider={<StackDivider />} py="2" >
        {
            data[0].values.map(log => <LogItem log={log} labels={data[0].labels}  panel={props.panel}/>)
        }
    </VStack >)
}

export default LogPanel


interface LogItemProps {
    labels: { [key: string]: string }
    log: [string, string]
    panel: Panel
}
const LogItem = ({ labels, log, panel }: LogItemProps) => {
    const [collapsed, setCollapsed] = useState(true)
    const timestamp = toNumber(log[0]) / 1e6
    const options = panel.plugins.log
    return (<>
        <HStack pt="1" alignItems="start" spacing={2} pl="2" pr="4" onClick={() => setCollapsed(!collapsed)} cursor="pointer"> 
            <HStack spacing={1}>
                <CollapseIcon collapsed={collapsed}  fontSize="0.6rem" opacity="0.6" mt={options.showTime ? 0 : '6px'} />
                {options.showTime && <Text fontSize="0.85rem" fontWeight={450} minWidth="160px">
                    {dateTimeFormat(timestamp, { format: 'YY-MM-DD HH:mm:ss.SSS' })}
                </Text>}
            </HStack>
            <HStack minWidth="270px" maxWidth="270px" >
                {
                     Object.keys(labels).map(key => <HStack spacing={0} fontSize="0.85rem" alignItems="start">
                           <Text fontWeight={450} className="color-text">
                                {key}
                            </Text>
                            <Text>=</Text>
                            <Text>
                                {labels[key]}
                            </Text>
                     </HStack>)
                }
            </HStack>
            <Text fontSize="0.85rem" wordBreak="break-all">{log[1]}</Text>
        </HStack>
        {
            !collapsed && <Box p="4">
                <VStack alignItems="left" className="bordered" p="2">
                    {
                        Object.keys(labels).map(key => <HStack px="2" spacing={1}>
                            <Text fontSize="0.85rem" fontWeight={450} minWidth="20em" className="color-text">
                                {key}
                            </Text>
                            <Text fontSize="0.85rem" >
                                {labels[key]}
                            </Text>

                        </HStack>)
                    }
                </VStack>
            </Box>}
    </>)
}