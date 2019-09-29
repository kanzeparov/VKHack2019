import React from 'react';
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {Panel, Tooltip, Separator} from '@vkontakte/vkui'
import axios from 'axios';
import {config} from '../ApiConfig'
import connect from '@vkontakte/vk-connect';

class PromiseLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promiseTooltipShown: false,
            promiseMerkTooltipShown: false,
            promise: {
                description: '',
                metrics: '',
                category: 0,
                wall_pub: false,
                story_pub: false,
                exp_date: 0,
                pub_date: 0,
                transactions: []
            }
        }
    }

    render() {

        return (
            <Panel theme="white" id="promise" title="Создайте обещание">

                <FormLayout>
                    <div style={{marginLeft: 12}}>Представь публично свой challendge. (Чем глобальнее цель, тем больше поддержки)</div>
                    <Tooltip onClose={() => {}}
                             isShown={this.state.promiseTooltipShown}
                             text="Например, я ставлю цель пробежать 100 км в течение месяца и похудеть на 3 кг. Я хочу быть здоровым и сократить риск возникновения инсульта.">
                        <Textarea onChange={(event) => {this.changeDescription(event)}}
                                  onFocus={() => {this.setState({...this.state, promiseTooltipShown: true})}}
                                  onBlur={() => {this.setState({...this.state, promiseTooltipShown: false})}}
                                  top="Представь публично свой challendge. (Чем глобальнее цель, тем больше поддержки)"
                                  placeholder="Обещание"/>
                    </Tooltip>

                    <Separator style={{ margin: '0' }} />

                    <div style={{marginLeft: 12}}>По каким измеримым показателям я гарантирантирую выполнение</div>
                    <Tooltip onClose={() => {}}
                             isShown={this.state.promiseMerkTooltipShown}
                             text="Например, выложу в приложении скрины всех треков пробежки, а также буду записывать строис после каждой пробежки ">

                        <Textarea onChange={(event) => {this.changeMetrics(event)}}
                                  onFocus={() => {this.setState({...this.state, promiseMerkTooltipShown: true})}}
                                  onBlur={() => {this.setState({...this.state, promiseMerkTooltipShown: false})}}
                                  top="По каким измеримым показателям я гарантирантирую выполнение"/>
                    </Tooltip>

                    <Separator style={{ margin: '0' }} />

                    <div style={{marginLeft: 12}}>Категория моего вызова:</div>

                    <Select onChange={(event) => {this.changeCategory(event)}}>
                        <option value="0">Спорт</option>
                        <option value="1">Питание</option>
                        <option value="2">Вес</option>
                        <option value="3">Сон</option>
                        <option value="4">Вредные привычки</option>
                        <option value="5">Другое</option>
                    </Select>

                    <Separator style={{ margin: '0' }} />

                    <div style={{marginLeft: 12}}>Где хотите опубликовать</div>

                    <div style={{display: 'flex', 'align-items': 'center'}}>
                        <Checkbox onChange={(event) => {this.changeWallState(event)}}>На стене</Checkbox>
                        <Checkbox onChange={(event) => {this.changeStoriesState(event)}}>В сторис</Checkbox>
                    </div>

                    <Separator style={{ margin: '0' }} />

                    <div style={{marginLeft: 12}}>В течение какого времени будет выполнено</div>

                    <Select onChange={(event) => {this.changeCategory(event)}}>
                        <option value="0">День</option>
                        <option value="1">Неделя</option>
                        <option value="2">Месц</option>
                    </Select>

                    <Button onClick={() => {this.sendPayment()}} size="xl">Создать обещание</Button>
                </FormLayout>
            </Panel>)
    }

    changeDescription(event) {
        let prom = {...this.state.promise};
        prom.description = event.target.value;
        this.setState({promise: prom});
    }

    changeMetrics(event) {
        let prom = {...this.state.promise};
        prom.metrics = event.target.value;
        this.setState({promise: prom});
    }

    changeCategory(event) {
        let prom = {...this.state.promise};
        prom.category = event.target.value
        this.setState({promise: prom});
    }

    changeWallState(event) {
        let prom = {...this.state.promise};
        prom.wall_pub = event.target.value === 'on';
        this.setState({promise: prom});
    }

    changeStoriesState(event) {
        let prom = {...this.state.promise};
        prom.story_pub = event.target.value === 'on';
        this.setState({promise: prom});
    }

    sendPayment() {
        const info = this.state.promise;
        const https = require('https');

        info.userid = this.props.user.id;

        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        axios.post(config.api + '/submitpromise', info, { httpsAgent: agent })
            .then(() => {
                connect.send("VKWebAppShowWallPostBox", {"message": getPostContent(info), attachment: getAttachment(info)});
            })
            .catch(() => {})
    }
}

const getPostContent = (promise) => {
    return `Я бросаю себе вызов с целью улучшить свое здоровье, а также внести пожертвования в благотворительный фонд ОРБИ.
        ${promise.description}
        В качестве доказательства выполнения:
        ${promise.metrics}
        Обязуюсь выполнить описанный challenge в течение 
        Призываю всех помочь создать для меня дополнительный стимул довести дело до конца.
        Для отслеживания прогресса и поддержки меня, переходи по ссылке:`
};

const getAttachment = (promise) => {
    switch (promise.category) {
        case '0':
            return 'photo34917303_457242571';
        case '1':
            return 'photo34917303_457242574';
        case '2':
            return 'photo34917303_457242573';
        case '3':
            return 'photo34917303_457242576';
        case '4':
            return 'photo34917303_457242572';
        case '5':
            return 'hoto34917303_457242575';
    }
}

export default PromiseLayout