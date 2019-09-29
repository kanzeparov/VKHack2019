import React from "react";
import {List, Cell, InfoRow, Panel, Group, Spinner} from '@vkontakte/vkui'
import "./Promises.css"
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import axios from 'axios';
import {config} from '../ApiConfig'
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Select from "@vkontakte/vkui/dist/components/Select/Select";

class PromisesLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promises: [],
            amount: 10,
            isLoaded: true
        };
    }

    componentDidMount() {
        axios.get(config.api + '/getpromises').then((data) => {
            this.setState({
                promises: data.data,
                isLoaded: false
            })
        }).catch(() => {
        })
    }

    mapUsersToGroup(promises) {
        return promises ? promises.map((promise) => {
            return (
                <Group
                    size="l"
                    style={{marginBottom: 8}}>
                    <Cell className="user-cell"
                          before={promise.userphoto ? <Avatar src={promise.userphoto}/> : null}
                          description={promise.usercity}
                    >
                        {`${promise.username} ${promise.usersurname}`}
                    </Cell>
                    <InfoRow className="base-layout-item" title="Описание обещания">
                        {promise.description}
                    </InfoRow>
                    <InfoRow className="base-layout-item" title="Цель">
                        {promise.metrics}
                    </InfoRow>
                    <InfoRow className="base-layout-item" title="Категория">
                        {this.getCategory(promise.category)}
                    </InfoRow>
                    <InfoRow className="base-layout-item" title="Уже пожервовали">
                        {this.getSumm(promise)}
                    </InfoRow>
                    {!promise.image ? <div style={{display: 'flex', 'justify-content': 'flex-end'}}>
                        <Select
                            onChange={(event) => {this.changeMount(event)}}
                            style={{width: 120, marginRight: 8}}
                            size="m">
                            <option value="10">10</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </Select>
                        <Button onClick={() => {
                            this.createPaymentWidget(this.state.amount, this.props.user, promise)
                        }} size="m">Участвовать</Button>
                    </div>: <img src={promise.image}/>}
                </Group>
            )
        }) : []
    }

    changeMount(event) {
        this.setState({
            amount: event.target.value,
            promises: this.state.promises
        })
    }

    getSumm(promise) {
        let summ = 0;
        (promise.transactions || []).forEach((transaction) => {
            summ += parseInt(transaction.amount);
        });
        return summ;
    }

    getCategory(number) {
        if(parseInt(number) === 0) {
            return 'Спорт';
        }
        if(parseInt(number) === 1) {
            return 'Питание';
        }
        if(parseInt(number) === 2) {
            return 'Вес';
        }
        if(parseInt(number) === 3) {
            return 'Сон';
        }
        if(parseInt(number) === 4) {
            return 'Вредные привычки';
        }
        return 'другое';
    }

    render() {
        const {promises, isLoaded} = this.state;

        return (
            isLoaded ?
                <Spinner size="large" style={{'z-index': 6, marginTop: 20}}/> :
                <Panel>
                    <List theme="white">
                        {this.mapUsersToGroup(promises)}
                    </List>
                </Panel>
        )
    }

    createPaymentWidget(amount, user, promise) {
        const widget = new window.cp.CloudPayments();

        widget.charge({
                publicId: 'pk_0572bdc3104df4c5cf12857cc4fcc',
                description: 'Фонд ОРБИ оплата',
                currency: 'RUB',
                skin: "modern",
                amount: parseInt(amount)
            },
            function () {
                axios.post(config.api + '/submitpayment', {
                    sender: user.id,
                    promiseid: promise.promiseid,
                    amount: amount,
                    photo: ''
                }).then(() => {

                }).catch(() => {

                })
            },
            function (reason, options) {

            });
    }
};

export default PromisesLayout;