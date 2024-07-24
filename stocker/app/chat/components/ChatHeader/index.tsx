import React from 'react';
import { parseISO } from 'date-fns';
import { MessagePopulated } from '../../types';
import './style.css';

export interface ChatHeaderProps {
	messages: MessagePopulated[];
}

function ChatHeader({ messages }: ChatHeaderProps) {
	return (
		<div className="chat__header">
			<div className="chat__headerInfo">
				<h3>Stocker</h3>
			</div>
			<div className="chat__headerIcons">
			</div>
		</div>
	);
}

export default ChatHeader;
