import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import { ConversationsPanel } from "../components/conversations-panel";

export const ConversationsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
      <ResizablePanel defaultSize={25} maxSize={25} minSize={20}>
        <ConversationsPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-full" defaultSize={70}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
