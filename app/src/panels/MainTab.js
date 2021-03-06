import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import {Tabs, TabsItem} from '@vkontakte/vkui'

const MainTab = ({id, clickTab}) => (
    <Panel theme="white">
        <Tabs theme="header" type="default">
            <TabsItem selected={true}>
                Главная
            </TabsItem>
            <TabsItem>
                Мои обещания
            </TabsItem>
            <TabsItem>
                Обещания друзей
            </TabsItem>
        </Tabs>
    </Panel>
);

export default MainTab