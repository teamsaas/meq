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

import {  Select, Switch } from "@chakra-ui/react"
import ValueCalculation from "components/ValueCalculation"
import { EditorInputItem, EditorNumberItem } from "components/editor/EditorItem"
import PanelAccordion from "src/views/dashboard/edit-panel/Accordion"
import PanelEditItem from "src/views/dashboard/edit-panel/PanelEditItem"
import { Panel, PanelEditorProps } from "types/dashboard"
import React, { memo } from "react";
import { useStore } from "@nanostores/react"
import { commonMsg, gaugePanelMsg } from "src/i18n/locales/en"
import ThresholdEditor from "components/Threshold/ThresholdEditor"
import { SeriesData } from "types/seriesData"
import { isEmpty } from "utils/validate"
const GaugePanelEditor = memo((props: PanelEditorProps) => {
    const t = useStore(commonMsg)
    const t1 = useStore(gaugePanelMsg)
    const { panel, onChange,data } = props
    const seriesNames = (data.flat() as SeriesData[]).map(s => s.name)
    if (isEmpty(panel.plugins.gauge.diisplaySeries )) {
        if (seriesNames?.length >= 1) {
            onChange((panel: Panel) => {
                panel.plugins.gauge.diisplaySeries = seriesNames[0]
            })
        }
    } else {
        if (!seriesNames.includes(panel.plugins.gauge.diisplaySeries)) {
            if (seriesNames?.length >= 1) {
                onChange((panel: Panel) => {
                    panel.plugins.gauge.diisplaySeries = seriesNames[0]
                })
            }
        }
    }

    return (
        <>
            <PanelAccordion title={t.basicSetting}>
                <PanelEditItem title={t.animation} desc={t.animationTips}>
                    <Switch defaultChecked={panel.plugins.gauge.animation} onChange={e => onChange((panel: Panel) => {
                        panel.plugins.gauge.animation = e.currentTarget.checked
                    })} />
                </PanelEditItem>
                <PanelEditItem title={t.series} desc={t.seriesTips}>
                    <Select value={panel.plugins.gauge.diisplaySeries} onChange={e => {
                        const v = e.currentTarget.value 
                        onChange((panel: Panel) => {
                            panel.plugins.gauge.diisplaySeries = v
                        })
                    }}>
                        {seriesNames.map(name => <option value={name}>{name}</option>)}
                    </Select>
                </PanelEditItem>
            </PanelAccordion>
            <PanelAccordion title={t.valueSettings}>
                <PanelEditItem title={t.show}>
                    <Switch defaultChecked={panel.plugins.gauge.value.show} onChange={e => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.show = e.currentTarget.checked
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Font size">
                    <EditorNumberItem value={panel.plugins.gauge.value.fontSize} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.fontSize = v
                    })} step={1}/>
                </PanelEditItem>


                <PanelEditItem title="Left" desc={t1.leftTips}>
                    <EditorInputItem value={panel.plugins.gauge.value.left} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.left = v
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Top" desc={t1.topTips}>
                    <EditorInputItem value={panel.plugins.gauge.value.top} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.top = v
                    })} />
                </PanelEditItem>

                <PanelEditItem title={t.unit}>
                    <EditorInputItem value={panel.plugins.gauge.value.unit} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.unit = v
                    })} />
                </PanelEditItem>

                <PanelEditItem title={t.decimal}>
                    <EditorNumberItem value={panel.plugins.gauge.value.decimal} min={0} max={5} step={1} onChange={v => onChange((panel: Panel) => { panel.plugins.gauge.value.decimal = v })} />
                </PanelEditItem>
                <PanelEditItem title={t.calc} desc={t.calcTips}>
                    <ValueCalculation value={panel.plugins.gauge.value.calc} onChange={v => {
                        onChange((panel: Panel) => { panel.plugins.gauge.value.calc = v })
                    }} />
                </PanelEditItem>
            </PanelAccordion>

            <PanelAccordion title={t.title}>
                <PanelEditItem title={t.show}>
                    <Switch defaultChecked={panel.plugins.gauge.title.show} onChange={e => onChange((panel: Panel) => {
                        panel.plugins.gauge.title.show = e.currentTarget.checked
                    })} />
                </PanelEditItem>
                <PanelEditItem title={t.display}>
                    <EditorInputItem value={panel.plugins.gauge.title.display} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.title.display = v
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Font size">
                    <EditorNumberItem value={panel.plugins.gauge.title.fontSize} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.title.fontSize = v
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Left" desc={t1.leftTips}>
                    <EditorInputItem value={panel.plugins.gauge.title.left} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.title.left = v
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Top" desc={t1.topTips}>
                    <EditorInputItem value={panel.plugins.gauge.title.top} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.title.top = v
                    })} />
                </PanelEditItem>
            </PanelAccordion>
            <PanelAccordion title={t1.pointer}>
                <PanelEditItem title="Width">
                    <EditorNumberItem value={panel.plugins.gauge.pointer.width} step={1} onChange={(v) => onChange((panel: Panel) => {
                            panel.plugins.gauge.pointer.width = v
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Length">
                    <EditorInputItem value={panel.plugins.gauge.pointer.length} onChange={(v) => onChange((panel: Panel) => {
                            panel.plugins.gauge.pointer.length = v
                    })} />
                </PanelEditItem>
            </PanelAccordion>
            <PanelAccordion title={t.axis}>
                <PanelEditItem title="Min">
                    <EditorNumberItem value={panel.plugins.gauge.value.min} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.min = v
                    })} />
                </PanelEditItem>
                <PanelEditItem title="Max">
                    <EditorNumberItem value={panel.plugins.gauge.value.max} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.value.max = v
                    })} />
                </PanelEditItem>

                <PanelEditItem title="Width">
                    <EditorNumberItem value={panel.plugins.gauge.axis.width} onChange={(v) => onChange((panel: Panel) => {
                        panel.plugins.gauge.axis.width = v
                    })} step={1}/>
                </PanelEditItem>
                <PanelEditItem title={t1.showTicks} >
                    <Switch defaultChecked={panel.plugins.gauge.axis.showTicks} onChange={e => onChange((panel: Panel) => {
                        panel.plugins.gauge.axis.showTicks = e.currentTarget.checked
                    })} />
                </PanelEditItem>
            </PanelAccordion>

            <PanelAccordion title={t.scale}>
                <PanelEditItem title={t.display}>
                    <Switch defaultChecked={panel.plugins.gauge.scale.enable} onChange={e => {
                        onChange((panel: Panel) => {
                            panel.plugins.gauge.scale.enable = e.currentTarget.checked
                        })
                    }} />
                </PanelEditItem>
                <PanelEditItem title={t1.splitNum}>
                    <EditorNumberItem value={panel.plugins.gauge.scale.splitNumber} min={0} max={10} step={1} onChange={v => onChange((panel: Panel) => { panel.plugins.gauge.scale.splitNumber = v })} />
                </PanelEditItem>
                <PanelEditItem title="Font size">
                    <EditorNumberItem value={panel.plugins.gauge.scale.fontSize} min={12} max={20} step={1} onChange={v => onChange((panel: Panel) => { panel.plugins.gauge.scale.fontSize = v })} />
                </PanelEditItem>
            </PanelAccordion>

            <PanelAccordion title="Thresholds">
                <ThresholdEditor value={panel.plugins.gauge.thresholds} onChange={(v) => onChange((panel: Panel) => {
                    panel.plugins.gauge.thresholds = v
                })} />
            </PanelAccordion>
        </>
    )
})

export default GaugePanelEditor