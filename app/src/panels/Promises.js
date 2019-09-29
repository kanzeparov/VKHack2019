import React from "react";
import {List, Cell, InfoRow, Panel, Group} from '@vkontakte/vkui'
import "./Promises.css"
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import axios from 'axios';
import {config} from '../ApiConfig'
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Select from "@vkontakte/vkui/dist/components/Select/Select";

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
        const fetchedUser = this.props.user;

        return (
            <Panel>
                <List theme="white">
                    <Group
                        size="l"
                        style={{marginBottom: 8}}>
                        <Cell className="user-cell"
                            before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                            description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                        >
                            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                        </Cell>
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
                            <Select style={{width: 120, marginRight: 8}} size="m" onChange={() => {}}>
                                <option value="10">10</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                            </Select>
                            <Button onClick={() => {createPaymentWidget()}} size="m">Участвовать</Button>
                        </div>
                    </Group>
                    <Group style={{marginBottom: 8}}>
                        <Cell className="user-cell"
                              before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                              description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                        >
                            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                        </Cell>
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
                            <Select style={{width: 120, marginRight: 8}} size="m" onChange={() => {}}>
                                <option value="10">10</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                            </Select>
                            <Button onClick={() => {createPaymentWidget()}} size="m">Участвовать</Button>
                        </div>
                    </Group>
                </List>
            </Panel>)
    }
}

const createPaymentWidget = () => {
    const widget = new window.cp.CloudPayments();

    widget.charge({
            publicId: 'pk_0572bdc3104df4c5cf12857cc4fcc',
            description: 'Фонд ОРБИ оплата',
            currency: 'RUB',
            skin: "modern",
            amount: 10
        },
        function (options) { // success

        },
        function (reason, options) { // fail

        });
};

export default PromisesLayout;