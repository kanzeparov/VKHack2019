import React, {useEffect, useState} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import PromiseLayout from './panels/Promise'
import MainTab from './panels/MainTab'
import {Div, Panel} from '@vkontakte/vkui'
import Home from "./panels/Home";
import "./panels/common.css"


const App = () => {
    const [activePanel, setActivePanel] = useState('home');
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

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

    const header = false;

    return (
        <View theme="light" header={false} popout={popout} activePanel="tabs">
            <Panel id="tabs">

                <MainTab class="no-padding"/>

                <Div>
                    <Home id='home' fetchedUser={fetchedUser} go={go}/>
                </Div>

                <PromiseLayout/>


            </Panel>
        </View>
    );
};

export default App;

