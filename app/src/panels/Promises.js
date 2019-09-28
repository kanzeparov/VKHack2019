import React from "react";
import {List, Cell, Div, InfoRow, CellButton, Panel} from '@vkontakte/vkui'
import "./Promises.css"
import Button from "@vkontakte/vkui/dist/components/Button/Button";

class PromisesLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Panel>
            <List>
                <Cell styles={{width: '100%'}} size="l" bottomContent={
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
                </Cell>
                <Cell size="l"
                      bottomContent={
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
                </Cell>
                <Cell size="l"
                      bottomContent={
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
                </Cell>
                <Cell size="l"
                      bottomContent={
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
                </Cell>
            </List>
        </Panel>)
    }
}

export default PromisesLayout;