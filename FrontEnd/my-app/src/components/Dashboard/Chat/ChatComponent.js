import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { ChatList, MessageList, Input, Button } from 'react-chat-elements';

const ChatComponent = ({ userId }) => {
    const [client, setClient] = useState(null);
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        async function initChat() {
            const client = StreamChat.getInstance('your_stream_api_key');
            const tokenResponse = await fetch(`/token?userId=${userId}`);
            const { token } = await tokenResponse.json();

            client.connectUser({ id: userId }, token);

            const channel = client.channel('messaging', 'ChannelID', {
                name: 'Doctorant and Professeur Chat',
            });

            await channel.watch();
            setClient(client);
            setChannel(channel);
        }

        initChat();
        return () => client && client.disconnect();
    }, [userId]);

    const sendMessage = async (text) => {
        if (channel) {
            await channel.sendMessage({ text });
        }
    };

    return (
        <div>
            <MessageList dataSource={channel.state.messages.map(message => ({
                position: message.user.id === userId ? 'right' : 'left',
                type: 'text',
                text: message.text,
                date: new Date(message.created_at),
            }))} />
            <Input placeholder="Type here..." onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    sendMessage(e.target.value);
                    e.target.value = '';
                }
            }} />
        </div>
    );
};

export default ChatComponent;
