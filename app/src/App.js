import React, {useEffect, useState} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import PromiseLayout from './panels/Promise'
import {Div, Panel, Tabs, TabsItem, Group, HorizontalScroll} from '@vkontakte/vkui'
import Home from "./panels/Home";
import "./panels/common.css"
import MyPromiseLayout from "./panels/MyPromise";
import PromisesLayout from "./panels/Promises";


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
            return <PromiseLayout user={fetchedUser}/>
        }

        if (activeTab === 1) {
            return <MyPromiseLayout/>

        }

        if (activeTab === 2) {
            return <PromisesLayout/>

        }
    }

    const header = false;

    return (
        <View theme="brand" header={false} popout={popout} activePanel="tabs">
            <Panel theme="white" id="tabs">
                <Div>
                    <Home id='home' fetchedUser={fetchedUser} go={go}/>
                </Div>
                    <Panel theme="white">
                        <Tabs theme="header" type="buttons">
                            <HorizontalScroll>
                            <TabsItem style={{cursor: 'pointer'}} onClick={() => {setActiveTab(0)}} selected={activeTab === 0}>
                                Главная
                            </TabsItem>
                            <TabsItem style={{cursor: 'pointer'}} onClick={() => {setActiveTab(1)}} selected={activeTab === 1}>
                                Мои обещания
                            </TabsItem>
                            <TabsItem style={{cursor: 'pointer'}} onClick={() => {setActiveTab(2)}} selected={activeTab === 2}>
                                Обещания
                            </TabsItem>

                        </HorizontalScroll>
                        </Tabs>
                    </Panel>

                <Div>
                    {getActiveTab()}
                </Div>

            </Panel>
        </View>
    );
};

export default App;

