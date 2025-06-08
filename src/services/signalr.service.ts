import {
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
  HubConnection,
} from '@microsoft/signalr';
import type { ChatMessage } from '@/types/ChatMessage';

const API_URL = import.meta.env.VITE_SIGNALR_URL;

class SignalRService {
  private connection: HubConnection;

  private messageHandlers: ((msg: ChatMessage) => void)[] = [];

  private isListenersSetup = false;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(API_URL)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();
  }

  public async connect(): Promise<void> {
    if (this.connection.state !== HubConnectionState.Disconnected) return;

    if (!this.isListenersSetup) {
      this.setupListeners();
      this.isListenersSetup = true;
    }

    try {
      await this.connection.start();
      console.info('[SignalR] Connected');
    } catch (err) {
      console.error('[SignalR] Connection failed:', err);
      throw err;
    }
  }

  public async sendMessage(sender: string, text: string): Promise<void> {
    try {
      await this.connection.invoke('SendMessage', sender, text);
    } catch (err) {
      console.error('[SignalR] Failed to send message:', err);
      throw err;
    }
  }

  public onMessage(handler: (msg: ChatMessage) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  public async disconnect(): Promise<void> {
    if (this.connection.state === HubConnectionState.Disconnected) return;

    try {
      await this.connection.stop();
      console.info('[SignalR] Disconnected');
    } catch (err) {
      console.warn('[SignalR] Failed to stop connection:', err);
    }
  }

  private setupListeners() {
    this.connection.on('ReceiveMessage', (sender: string, text: string) => {
      const msg: ChatMessage = {
        sender,
        text,
        timestamp: new Date().toISOString(),
      };

      this.messageHandlers.forEach((handler) => handler(msg));
    });

    this.connection.onreconnecting((err) => {
      console.warn('[SignalR] Reconnecting...', err);
    });

    this.connection.onreconnected(() => {
      console.info('[SignalR] Reconnected');
    });

    this.connection.onclose((err) => {
      console.warn('[SignalR] Connection closed', err);
    });
  }
}

export const signalRService = new SignalRService();
