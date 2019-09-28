import React from 'react';
import {Panel, InfoRow, Group, UsersStack, Separator} from '@vkontakte/vkui'
import './MyPromise.css'
import Button from "@vkontakte/vkui/dist/components/Button/Button";

class MyPromiseLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel theme="white">
                <Group title="Основные параметры">
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
                </Group>

                <Separator style={{ margin: '12px 0' }} />

                <Group style={{marginTop: 12}} title="В вас верят">
                    <UsersStack
                        photos={[
                            'https://sun9-9.userapi.com/c847219/v847219582/1eac9d/jxtvce2MwZk.jpg?ava=1',
                            'https://pp.userapi.com/c834200/v834200315/1039ea/iFd9WUOdmDo.jpg?ava=1',
                            'https://sun9-20.userapi.com/c850332/v850332555/115030/JyNJrr4cytY.jpg?ava=1',
                            'https://sun9-18.userapi.com/c850024/v850024671/16f784/jDmN7V0YVb4.jpg?ava=1',
                            'https://sun9-18.userapi.com/c850024/v850024671/16f784/jDmN7V0YVb4.jpg?ava=1',
                            'https://sun9-18.userapi.com/c850024/v850024671/16f784/jDmN7V0YVb4.jpg?ava=1',
                        ]}
                        size="m"
                        count={3}
                        vertical
                    >Алексей, Илья, Михаил<br/>и ещё 3 человека</UsersStack>
                </Group>

                <Separator style={{ margin: '12px 0' }} />

                <Button style={{marginTop: 12}} size='xl'>Загрузить доказательство</Button>
                <Button onClick={() => {
                    createPaymentWidget()
                }} style={{marginTop: 12}} size='xl' level="secondary">Отправить деньги друзьям</Button>
            </Panel>
        )
    }
}

const createPaymentWidget = () => {
    const widget = new window.cp.CloudPayments();

    widget.charge({ // options
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

export default MyPromiseLayout;