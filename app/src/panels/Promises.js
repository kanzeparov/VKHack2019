import React from "react";
import {List, Cell, InfoRow, Panel, Group} from '@vkontakte/vkui'
import "./Promises.css"
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import axios from 'axios';
import {config} from '../ApiConfig'

class PromisesLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.post(config.api + '/getprombyusers', {
            ids: [this.props.user.id]
        }).then((data) => {
            console.log(data);
        }).catch(() => {
        })
    }

    render() {
        return (
            <Panel>
                <List theme="white">
                    <Group size="l" style={{marginBottom: 8}}>
                        <InfoRow className="base-layout-item" title="Описание обещания">
                                Я обещаю сбросить вес, мой текущий вес
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Цель">
                                Похудеть на 10 кг
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Категория">
                                Вес
                        </InfoRow>
                        <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                            <Button size="m">Оплатить</Button>
                        </div>
                    </Group>
                    <Group style={{marginBottom: 8}}>
                        <InfoRow className="base-layout-item" title="Описание обещания">
                            Я обещаю сбросить вес, мой текущий вес
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Цель">
                            Похудеть на 10 кг
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Категория">
                            Вес
                        </InfoRow>
                        <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                            <Button size="m">Оплатить</Button>
                        </div>
                    </Group>
                </List>
            </Panel>)
    }
}

export default PromisesLayout;