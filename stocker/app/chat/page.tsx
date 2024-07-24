'use client'

import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import { MessagePopulated } from './types';
import { useUser } from '../context/UserContext';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';
import { UserOutlined as PersonIcon } from '@ant-design/icons';
import { Spin } from "antd";
import { getApi } from '../api';

export interface ChatMessageProps {
	isLastMessage: boolean;
	message: MessagePopulated;
}

const ChatMessage = ({isLastMessage, message}: ChatMessageProps) => {
	const { userDetails } = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const [content, setContent] = useState("")

	useEffect(() => {
		message.getContent.then((msg) => {
			setContent(msg)
			setIsLoading(false)
		})
	}, [])

	const user = message.user;
	const createdAt = message.createdAt;

	return (
		<div
		className={`chat__block ${userDetails.username === user.username &&
			'chat__block--sender'} ${user.username === 'Chatbot' && 'chat__block--bot'}`}
	>
		<div className="message__block">
			{user.firstName && user.lastName ? (
				user.firstName.charAt(0) + user.lastName.charAt(0)
			) : (
				<PersonIcon />
			)}
			<div className="chat__message">
				<span className="header__text chat__person">
					{userDetails.username === user.username ? 'You' : user.username}
				</span>
				{
					isLoading 
						? <Spin />
						: <>{content}</>
				}
			</div>
		</div>
		<span className="chat__timestamp">{createdAt.toString()}</span>
	</div>
	);
}

export interface ChatProps {
	user: string;
}

const Chat = ({ user }: ChatProps) => {
	const { userDetails } = useUser();
	const [ messages, setMessages ] = useState([
	{
		createdAt: new Date(), 
		user: { username: "Stocker"},
		getContent: new Promise((resolve, reject) => 
			resolve("Hello! This is Stocker, your friendly neighbour trade recommender."))
	}
	] as MessagePopulated[]);

	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	const userAddNewMessage = (message: MessagePopulated) => {
		const newMessages = [...messages]
		const msgFromStocker: MessagePopulated = {
			user: { username: "Stocker"},
			createdAt: message.createdAt,
			getContent: new Promise((resolve, reject) => {
				getApi("stocker/cat", (data) => resolve(data), err => reject(err), () => {})
			})
		}
		newMessages.push(message)
		newMessages.push(msgFromStocker)
		setMessages(newMessages)
	}

	return (
		<div className="chat">
			<ChatHeader messages={messages} />
			<div className="chat__body">
				<div className="chat__main">
					{messages.map((message, i) => {
						return (
							<ChatMessage 
							message={message} 
							isLastMessage={messages.length - 1 === i} 
							key={i}/>
						);
					})}
				</div>
			</div>
			<ChatFooter roomCode={user} loggedInUser={userDetails} addNewMessage={userAddNewMessage}/>
		</div>
	);
};

export default Chat;
