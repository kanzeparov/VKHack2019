import React from 'react';
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {Panel, Tooltip} from '@vkontakte/vkui'

class PromiseLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promiseTooltipShown: false,
            promiseMerkTooltipShown: false
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
                        <Textarea onFocus={() => {this.setState({...this.state, promiseTooltipShown: true})}}
                                  onBlur={() => {this.setState({...this.state, promiseTooltipShown: false})}}
                                  top="Представь публично свой challendge. (Чем глобальнее цель, тем больше поддержки)"
                                  placeholder="Обещание"/>
                    </Tooltip>
                    <div style={{marginLeft: 12}}>По каким измеримым показателям я гарантирантирую выполнение</div>
                    <Tooltip onClose={() => {}}
                             isShown={this.state.promiseMerkTooltipShown}
                             text="Например, выложу в приложении скрины всех треков пробежки, а также буду записывать строис после каждой пробежки ">

                        <Textarea onFocus={() => {this.setState({...this.state, promiseMerkTooltipShown: true})}}
                                  onBlur={() => {this.setState({...this.state, promiseMerkTooltipShown: false})}}
                                  top="По каким измеримым показателям я гарантирантирую выполнение"
                                  placeholder="Мерки обещания"/>
                    </Tooltip>
                    <div style={{marginLeft: 12}}>Категория моего вызова:</div>
                    <Select placeholder="Категория">
                        <option value="sport">Спорт</option>
                        <option value="pit">Питание</option>
                        <option value="weight">Вес</option>
                        <option value="son">Сон</option>
                        <option value="">Вредные привычки</option>
                    </Select>

                    <div style={{marginLeft: 12}}>Где хотите опубликовать</div>

                    <div style={{display: 'flex'}}>
                        <Checkbox>На стене</Checkbox>
                        <Checkbox>В сторис</Checkbox>
                    </div>

                    <Button size="xl">Создать обещание</Button>
                </FormLayout>
            </Panel>)
    }
}


export default PromiseLayout