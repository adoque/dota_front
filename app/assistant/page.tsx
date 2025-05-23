"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Bot, User, Zap, Info, Sword, Shield } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';

type ApiHero = {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
};

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// const API_URL = process.env.NEXT_PUBLIC_API_URL; // Use this if you set up .env.local
const HARDCODED_API_URL = "https://dota2backend-production.up.railway.app";


export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your Dota 2 AI Assistant. I can help you with hero picks, counter strategies, and gameplay tips. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedHero, setSelectedHero] = useState<string | null>(null)
  const [assistantMode, setAssistantMode] = useState<"chat" | "pick" | "counter">("chat")
  const [heroes, setHeroes] = useState<ApiHero[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    // Using setTimeout to ensure scroll happens after DOM update and layout calculation
    const timerId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0); // A delay of 0ms pushes it to the next tick in the event loop

    return () => {
      clearTimeout(timerId); // Clean up the timeout if messages change again before it fires
    };
  }, [messages]); // Dependency array remains [messages]

  useEffect(() => {
    const apiUrl = HARDCODED_API_URL; // Or API_URL if using .env.local
    // 1. Fetch Heroes
    const fetchHeroes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/heroes`);
        if (!response.ok) {
          throw new Error(`Failed to fetch heroes: ${response.statusText}`);
        }
        const data: ApiHero[] = await response.json();
        setHeroes(data);
      } catch (error) {
        console.error("Error fetching heroes:", error);
      }
    };

    // 2. Create Session ID and register session with backend
    const initializeSession = async () => {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      try {
        const response = await fetch(`${apiUrl}/api/chat/create_session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: newSessionId }),
        });
        if (!response.ok) {
          throw new Error(`Failed to create session: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Session created:", data);
      } catch (error) {
        console.error("Error creating session:", error);
      }
    };

    fetchHeroes();
    initializeSession();
  }, []);

  const getAIResponse = useCallback(async (userMessageContent: string) => {
    const apiUrl = HARDCODED_API_URL; // Or API_URL
    if (!sessionId) {
      console.error("Session ID is not set. Cannot send message.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, there was an issue with my connection (no session). Please try refreshing the page.",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessageContent,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error from API" }));
        throw new Error(`API Error: ${response.status} - ${errorData.detail || response.statusText}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        },
      ]);

    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const handleSendMessage = async () => {
    if (input.trim() === "" || !sessionId) return;

    const userMessageText = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user" as const,
      content: userMessageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    await getAIResponse(userMessageText);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleHeroSelect = (heroName: string) => {
    setSelectedHero(heroName);

    if (assistantMode === "counter") {
      const question = `How do I counter ${heroName}?`;
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user" as const,
        content: question,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      getAIResponse(question);
    }
  }

  const handleModeChange = (mode: "chat" | "pick" | "counter") => {
    setAssistantMode(mode);
    setInput("");
    setSelectedHero(null);

    if (mode === "pick") {
      const question = "What heroes should I pick in the current meta?";
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user" as const,
        content: question,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      getAIResponse(question);
    }
  }

  const handleQuickQuestion = (question: string) => {
    if (!sessionId) return;
    
    const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: question,
        timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    getAIResponse(question);
  }


  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-red-500" />
                  AI Assistant
                </h2>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">Mode</h3>
                  <Tabs value={assistantMode} onValueChange={(v) => handleModeChange(v as "chat" | "pick" | "counter")}>
                    <TabsList className="bg-gray-700 w-full grid grid-cols-3">
                      <TabsTrigger value="chat" className="data-[state=active]:bg-red-600">
                        <Info className="h-4 w-4 mr-1" />
                        Chat
                      </TabsTrigger>
                      <TabsTrigger value="pick" className="data-[state=active]:bg-red-600">
                        <Sword className="h-4 w-4 mr-1" />
                        Pick
                      </TabsTrigger>
                      <TabsTrigger value="counter" className="data-[state=active]:bg-red-600">
                        <Shield className="h-4 w-4 mr-1" />
                        Counter
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {assistantMode === "counter" && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Select Hero to Counter</h3>
                    <Select onValueChange={handleHeroSelect} value={selectedHero || ""}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select a hero" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {heroes.length > 0 ? (
                            heroes.map((hero) => (
                            <SelectItem key={hero.id} value={hero.localized_name}>
                                {hero.localized_name}
                            </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="loading" disabled>Loading heroes...</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="text-sm text-gray-400 mb-2">Quick Questions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => handleQuickQuestion("What's the current meta?")}
                    >
                      What's the current meta?
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => handleQuickQuestion("How to improve my last hitting?")}
                    >
                      How to improve my last hitting?
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700"
                      onClick={() => handleQuickQuestion("Best warding spots?")}
                    >
                      Best warding spots?
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700 h-[70vh] flex flex-col">
              <CardContent className="flex flex-col p-6 h-full">
                {/* FIXED: Proper message container with strict constraints */}
                <div className="flex-1 overflow-y-auto mb-4 pr-2">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "user" ? "bg-red-600 text-white" : "bg-gray-700 text-white"
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            {message.role === "assistant" ? (
                              <Bot className="h-5 w-5 mr-2" />
                            ) : (
                              <User className="h-5 w-5 mr-2" />
                            )}
                            <span className="font-medium">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                          </div>
                          <p className="whitespace-pre-line break-words">{message.content}</p>
                          <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    ))}
                    {/* This empty div is the target for scrolling */}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                {/* END SCROLLABLE MESSAGE CONTAINER */}

                <div className="mt-auto">
                  <div className="flex items-end">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                          assistantMode === "chat" ? "Ask about heroes, strategies, or gameplay..." :
                          assistantMode === "pick" ? "Ask for hero pick recommendations..." :
                          "Select a hero above to ask how to counter them, or type a general query."
                      }
                      className="bg-gray-700 border-gray-600 text-white flex-grow mr-2"
                      rows={3}
                      disabled={assistantMode === "pick" || (assistantMode === "counter" && !selectedHero && input.trim() === "")}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || input.trim() === "" || !sessionId}
                      className="bg-red-600 hover:bg-red-700 h-12 w-12 p-0"
                      >
                      {isLoading ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                          <Send className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 text-center text-gray-400 text-sm">
              <p>
                Powered by Gemini AI - Get personalized advice for your Dota 2 gameplay
                <Zap className="inline-block ml-1 h-4 w-4 text-yellow-500" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}