import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2 } from "lucide-react";
import { useState } from "react";

interface SettingsProps {
  selectedModel: "openai" | "snowflake" | "worker";
  setSelectedModel: (model: "openai" | "snowflake" | "worker") => void;
  systemMessage: string;
  setSystemMessage: (message: string) => void;
  setMessages: (
    messages: { id: string; role: string; content: string }[]
  ) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  selectedModel,
  setSelectedModel,
  systemMessage,
  setSystemMessage,
  setMessages,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <button
          className="hover:bg-white/25 focus:bg-white/25 p-2 rounded-lg"
          aria-label="Open settings"
        >
          <Settings2 className="h-4 w-4 text-white" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>
              Configure the AI model and system message.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Select
              value={selectedModel}
              onValueChange={(value: "openai" | "snowflake" | "worker") =>
                setSelectedModel(value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Models</SelectLabel>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="snowflake">Snowflake</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-4">
              <label htmlFor="system-message" className="block mb-2">
                System Message:
              </label>
              <textarea
                id="system-message"
                value={systemMessage}
                onChange={(e) => setSystemMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              ></textarea>
            </div>
          </div>
          <DrawerFooter>
            <Button
              aria-label="Save settings"
              onClick={() => {
                setMessages([
                  { id: "1", role: "system", content: systemMessage },
                ]);
                setIsDrawerOpen(false);
              }}
            >
              Save
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" aria-label="Close settings">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
