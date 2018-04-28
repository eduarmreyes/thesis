import React, { Component } from 'react';

import { Panel, PanelUser, PanelAction, PanelActionWrapper, PanelList, PanelListItem, PanelListTitle, PanelListWrapper } from '../UI/Panel';

export default class ExamplePanel extends Component {
    render() {
        return (
            <Panel>
                <PanelUser name="John Bohn" subtitle="Copywriter" image="/img/tmp/user-8.jpg" />

                <PanelListWrapper>
                    <PanelListTitle>Tareas</PanelListTitle>

                    <PanelList>
                        <PanelListItem>Example.</PanelListItem>
                        <PanelListItem>Example.</PanelListItem>
                        <PanelListItem>Example</PanelListItem>
                    </PanelList>

                    <PanelListTitle>Sticky Notes</PanelListTitle>

                    <PanelList>
                        <PanelListItem>Example</PanelListItem>
                        <PanelListItem>Example</PanelListItem>
                        <PanelListItem>Example</PanelListItem>
                        <PanelListItem>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</PanelListItem>
                    </PanelList>
                </PanelListWrapper>

               {/* <PanelActionWrapper>
                    <PanelAction title="Create" icon="bookmark_border" />
                    <PanelAction title="Phone" icon="phone" />
                    <PanelAction title="Status" icon="show_chart" />
                    <PanelAction title="Search" icon="search" />
                    <PanelAction title="Create" icon="group_add" />
                    <PanelAction title="Chat" icon="chat_bubble_outline" />
                </PanelActionWrapper>*/}
            </Panel>
        );
    }
}
