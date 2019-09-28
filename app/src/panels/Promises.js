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
                    <Group bottomContent={
                        <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                            <Button size="m">Оплатить</Button>
                        </div>
                    }>
                        <InfoRow className="base-layout-item" title="Описание обещания">
                            <div className='info-block'>
                                Я обещаю сбросить вес, мой текущий вес
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Цель">
                            <div className='info-block'>
                                Похудеть на 10 кг
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Категория">
                            <div className='info-block'>
                                Вес
                            </div>
                        </InfoRow>
                    </Group>
                    <Group bottomContent={
                        <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                            <Button size="m">Оплатить</Button>
                        </div>
                    }>
                        <InfoRow className="base-layout-item" title="Описание обещания">
                            <div className='info-block'>
                                Я обещаю сбросить вес, мой текущий вес
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Цель">
                            <div className='info-block'>
                                Похудеть на 10 кг
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Категория">
                            <div className='info-block'>
                                Вес
                            </div>
                        </InfoRow>
                    </Group>
                    <Group bottomContent={
                        <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                            <Button size="m">Оплатить</Button>
                        </div>
                    }>
                        <InfoRow className="base-layout-item" title="Описание обещания">
                            <div className='info-block'>
                                Я обещаю сбросить вес, мой текущий вес
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Цель">
                            <div className='info-block'>
                                Похудеть на 10 кг
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Категория">
                            <div className='info-block'>
                                Вес
                            </div>
                        </InfoRow>
                    </Group>
                    <Group bottomContent={
                        <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                            <Button size="m">Оплатить</Button>
                        </div>
                    }>
                        <InfoRow className="base-layout-item" title="Описание обещания">
                            <div className='info-block'>
                                Я обещаю сбросить вес, мой текущий вес
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Цель">
                            <div className='info-block'>
                                Похудеть на 10 кг
                            </div>
                        </InfoRow>
                        <InfoRow className="base-layout-item" title="Категория">
                            <div className='info-block'>
                                Вес
                            </div>
                        </InfoRow>
                    </Group>
                </List>
            </Panel>)
    }
}

export default PromisesLayout;