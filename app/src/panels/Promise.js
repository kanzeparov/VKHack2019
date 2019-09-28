import React from 'react';
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Select from "@vkontakte/vkui/dist/components/Select/Select";
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {Panel} from '@vkontakte/vkui'

class PromiseLayout extends React.Component {
    render() {
        return (
            <Panel theme="white" id="promise" title="Создайте обещание">

                <div style={{marginLeft: 12}}>Создайте обещание</div>

                <FormLayout>
                    <Textarea top="Описание обещания" placeholder="Описание обещания"/>
                    <Textarea top="Мерки обещания" placeholder="Мерки обещания"/>
                    <Select placeholder="Категория">
                        <option value="sport">Спорт</option>
                        <option value="pit">Питание</option>
                        <option value="weight">Вес</option>
                        <option value="son">Сон</option>
                        <option value="">Вредные привычки</option>
                    </Select>
                    <Checkbox>Опубликовать на стене</Checkbox>
                    <Checkbox>Опубликовать в сторис</Checkbox>

                    <Checkbox>Согласен со всем</Checkbox>
                    <Button size="xl">Создать обещание</Button>
                </FormLayout>
            </Panel>)
    }
}


export default PromiseLayout