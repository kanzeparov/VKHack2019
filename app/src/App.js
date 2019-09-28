import React, {useEffect, useState} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import PromiseLayout from './panels/Promise'
import {Div, Panel, Tabs, TabsItem, Group} from '@vkontakte/vkui'
import Home from "./panels/Home";
import "./panels/common.css"


const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        connect.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        async function fetchData() {
            const user = await connect.sendPromise('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    function getActiveTab() {

        if (activeTab === 0) {
            return <Group style={{paddingLeft: 8, paddingTop: 0}} title="Главная">
                <PromiseLayout/>
            </Group>
        }

        if (activeTab === 1) {
            return <Div>
                <Group title="Мои обещания" theme="light">
                    Мои обещания
                </Group>
            </Div>
        }

        if (activeTab === 2) {
            return <Group title="Обещания друзей" theme="light">
                Обещания
            </Group>
        }
    }

    const header = false;

    return (
        <View theme="light" header={false} popout={popout} activePanel="tabs">
            <Panel id="tabs">
                <Div>
                    <Home id='home' fetchedUser={fetchedUser} go={go}/>
                </Div>

				<Div style={{position: 'relative'}}>
                    <Panel theme="light">
                        <Tabs theme="header" type="default">
                            <TabsItem onClick={() => {setActiveTab(0)}} selected={activeTab === 0}>
                                Главная
                            </TabsItem>
                            <TabsItem onClick={() => {setActiveTab(1)}} selected={activeTab === 1}>
                                Мои обещания
                            </TabsItem>
                            <TabsItem onClick={() => {setActiveTab(2)}} selected={activeTab === 2}>
                                Обещания друзей
                            </TabsItem>
                        </Tabs>
                    </Panel>
				</Div>

				{getActiveTab()}


            </Panel>
        </View>
    );
};

export default App;

