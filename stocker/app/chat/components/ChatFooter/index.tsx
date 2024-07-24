import React, { useState } from 'react';
import { ChatMessage, MessagePopulated, User } from '../../types';
import './style.css'
// import { useChat } from '@/app/context/ChatContext';
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export interface ChatFooterProps {
	roomCode: string;
	loggedInUser: User;
	addNewMessage: (msg: MessagePopulated) => void 
}

function ChatFooter({ roomCode, loggedInUser, addNewMessage }: ChatFooterProps) {
	const [ input, setInput ] = useState('');
	// const chatSocket = useChat();
	const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (input) {
			const message: MessagePopulated = {
				createdAt: new Date(), 
				user: loggedInUser,
				getContent: new Promise((resolve, reject) => resolve(input))
			}
			setInput('');
			addNewMessage(message)
			console.log('sending message: ' + JSON.stringify(message));
		}
	};
	return (
		<div className="chat__footer">
			<form>
				<input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Start typing.." />
				<button onClick={sendMessage} type="submit">
					Send
				</button>
			</form>
			<Button onClick={sendMessage}>
				<SendOutlined />
			</Button>
		</div>
	);
}

export default ChatFooter;
