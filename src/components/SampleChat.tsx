import { Box, Button } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useChannel } from "@ably-labs/react-hooks";
import { Types } from "ably";

/**
 * sample chat component from Ably
 * @remarks needs to be imported dynamically
 * @use const Chat = dynamic(() => import("components/SampleChat"));
 */
export default function SampleChat() {
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<Types.Message[]>([]);

  const messageTextIsEmtpy = messageText.trim().length === 0;

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [channel] = useChannel("chat-demo", "chat-message", async (message) => {
    setMessages((messages) => [...messages, message]);
  });

  const getChatMessages = () => {
    // chat persistence rules must be added in the dashboard, default history is 2 minutes
    channel.history(function (error, results) {
      if (error) {
        throw new Error(error.message);
      }

      if (results) {
        setMessages(results.items);
      }
    });
  };

  const sendChatMessage = (messageText: string) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    inputRef?.current?.focus();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter" || messageTextIsEmtpy) {
      return;
    }

    sendChatMessage(messageText);
    event.preventDefault();
  };

  useEffect(() => {
    getChatMessages();
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box>
        {messages.map((message, index) => {
          return <li key={index}>{message.data}</li>;
        })}
        <Box ref={messageEndRef} />
        <form onSubmit={handleFormSubmit}>
          <textarea
            ref={inputRef}
            value={messageText}
            placeholder="type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
          ></textarea>
          <Button type="submit" disabled={messageTextIsEmtpy}>
            Send
          </Button>
        </form>
      </Box>
    </Box>
  );
}
