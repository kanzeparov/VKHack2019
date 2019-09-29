import React from 'react';
import {Panel, InfoRow, Group, Div, Spinner, UsersStack, Separator, Button, Input} from '@vkontakte/vkui'
import './MyPromise.css'
import axios from 'axios';
import {config} from "../ApiConfig";

class MyPromiseLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promise: {},
            inputImage: null,
            isLoaded: true
        };
    }

    componentDidMount() {
        axios.post(config.api + '/getprombyusers', {
            ids: [this.props.user.id]
        }).then((data) => {
            this.setState({
                isLoaded: false,
                promise: data.data[0]
            })
        }).catch(() => {})
    }

    render() {
        const promise = this.state.promise;
        const isLoaded = this.state.isLoaded;

        return promise ?
            <Panel theme="white">
                {isLoaded ? <Spinner size="large" style={{marginTop: 20}}/> :
                    <div>
                        <Group title="Основные параметры">
                            <InfoRow className="base-layout-item" title="Описание обещания">
                                {promise.description}
                            </InfoRow>
                            <InfoRow className="base-layout-item" title="Цель">
                                {promise.description}
                            </InfoRow>
                        </Group>

                        <Separator style={{margin: '12px 0'}}/>

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
                            >Алексей, Илья, Михаил<br/>и ещё 3 человека
                            </UsersStack>
                        </Group>

                        <Group style={{marginTop: 12}} title="Доказательство">
                            <Input onChange={(event) => {
                                this.changeInputImage(event)
                            }} top="Загрузите доказательство" size="xl"/>
                            <Button style={{marginTop: 8}} onClick={() => {
                                this.loadProof()
                            }} size="xl">Загрузить доказательство</Button>
                        </Group>
                    </div>
                }
            </Panel> : <Panel style={{display: 'flex', 'justify-content': 'center'}} theme="white">Нет обещаний</Panel>
    }

    changeInputImage(event) {
        const inputImage = event.target.value;
        this.setState({
            inputImage,
            promise: this.state.promise
        })
    }

    loadProof() {
        const promis = this.state.promise;
        this.setState({isLoaded: true});

        axios.post(config.api + '/submitimage', {
            image: this.state.inputImage,
            promiseid: promis.promiseid
        }).then((data) => {
            this.setState({
                isLoaded: false,
                promise: data.data,
                inputImage: null
            })
        }).catch(() => {
        })
    }
}

export default MyPromiseLayout;