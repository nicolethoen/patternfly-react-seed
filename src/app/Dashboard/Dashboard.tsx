import * as React from 'react';
import {
  PageSection,
  Card,
  CardBody,
  Title,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerPanelContent,
  DrawerPanelBody,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Slider,
  InputGroup,
  TextInput,
  Button,
  ButtonVariant,
  Split,
  SplitItem,
  Switch,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionToggle,
  Stack,
  StackItem,
  SliderOnChangeEvent,
  Flex,
  FlexItem
} from '@patternfly/react-core';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/chatbot/dist/dynamic/ChatbotContent';
import ChatbotWelcomePrompt from '@patternfly/chatbot/dist/dynamic/ChatbotWelcomePrompt';
import ChatbotFooter, { ChatbotFootnote } from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/chatbot/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/chatbot/dist/dynamic/MessageBox';
import Message, { MessageProps } from '@patternfly/chatbot/dist/dynamic/Message';
import {
  PencilAltIcon,
  CheckIcon,
  TimesIcon,
} from '@patternfly/react-icons';
import UserAvatar from '@app/bgimages/user_avatar.svg';
import RobotIcon from '@app/bgimages/badge-icon.svg';

const footnoteProps = {
  label: 'ChatBot uses AI. Check for mistakes.',
  popover: {
    title: 'Verify information',
    description: `While ChatBot strives for accuracy, AI is experimental and can make mistakes. We cannot guarantee that all information provided by ChatBot is up to date or without error. You should always verify responses using reliable sources, especially for crucial information and decision making.`,
    bannerImage: {
      src: 'https://cdn.dribbble.com/userupload/10651749/file/original-8a07b8e39d9e8bf002358c66fce1223e.gif',
      alt: 'Example image for footnote popover'
    },
    cta: {
      label: 'Dismiss',
      onClick: () => {
        alert('Do something!');
      }
    },
    link: {
      label: 'View AI policy',
      url: 'https://www.redhat.com/'
    }
  }
};

const markdown = `
Here is some JavaScript code:

~~~js
import React from 'react';

const MessageLoading = () => (
  <div className="pf-chatbot__message-loading">
    <span className="pf-chatbot__message-loading-dots">
      <span className="pf-v6-screen-reader">Loading message</span>
    </span>
  </div>
);

export default MessageLoading;

~~~
`;

const date = new Date();

const initialMessages: MessageProps[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hello, can you give me an example of what you can do?',
    name: 'User',
    avatar: UserAvatar,
    timestamp: date.toLocaleString(),
    avatarProps: { isBordered: true }
  },
  {
    id: '2',
    role: 'bot',
    content: markdown,
    name: 'Bot',
    avatar: RobotIcon,
    timestamp: date.toLocaleString(),
    actions: {
      // eslint-disable-next-line no-console
      positive: { onClick: () => console.log('Good response') },
      // eslint-disable-next-line no-console
      negative: { onClick: () => console.log('Bad response') },
      // eslint-disable-next-line no-console
      copy: { onClick: () => console.log('Copy') },
      // eslint-disable-next-line no-console
      share: { onClick: () => console.log('Share') },
      // eslint-disable-next-line no-console
      listen: { onClick: () => console.log('Listen') }
    }
  }
];

// Updated built-in tools data
const builtInTools = [
  { id: 'tool-rag', label: 'RAG' },
  { id: 'tool-websearch', label: 'Web Search' },
  { id: 'tool-codeinterpreter', label: 'Code Interpreter' },
];

const mcpServers = [
  { id: 'mcp-server-1', label: 'MCP Server Alpha' },
  { id: 'mcp-server-2', label: 'MCP Server Beta (Read-Only)' },
  { id: 'mcp-server-3', label: 'MCP Server Gamma' },
];

// --- Helper Function for Sliders (defined outside the component) ---
const createSliderGroup = (
  id: string,
  label: string,
  value: number, // Current state value
  inputValue: number, // Current state value for input
  setValue: (value: number) => void, // State setter function
  setInputValue: (value: number) => void, // State setter function for input value
  min: number = 0,
  max: number = 100
) => {

  const handleSliderChange = (
    _event: SliderOnChangeEvent,
    newValue: number,
    newInputValue?: number
  ) => {
    const finalValue = typeof newInputValue === 'number' ? newInputValue : newValue;
    const clampedValue = Math.max(min, Math.min(max, finalValue));
    setValue(clampedValue);
    setInputValue(clampedValue); // Ensure input value state is also updated
  };

  return (
    <FormGroup label={label} fieldId={id}>
      <Slider
        isInputVisible
        showBoundaries={false}
        value={value}
        inputValue={inputValue} // Use separate inputValue state
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
    </FormGroup>
  );
};
// --- End Helper Function ---

const Dashboard: React.FunctionComponent = () => {
  const [messages, setMessages] = React.useState<MessageProps[]>(initialMessages);
  const [selectedModel, setSelectedModel] = React.useState('Granite 7B');
  const [isSendButtonDisabled, setIsSendButtonDisabled] = React.useState(false);

  // Separate state for slider value and input value
  const [slider1Value, setSlider1Value] = React.useState(10);
  const [slider1InputValue, setSlider1InputValue] = React.useState(10);
  const [slider2Value, setSlider2Value] = React.useState(40);
  const [slider2InputValue, setSlider2InputValue] = React.useState(40);
  const [slider3Value, setSlider3Value] = React.useState(30);
  const [slider3InputValue, setSlider3InputValue] = React.useState(30);
  const [slider4Value, setSlider4Value] = React.useState(90);
  const [slider4InputValue, setSlider4InputValue] = React.useState(90);

  const [systemInstructions, setSystemInstructions] = React.useState("starter instructions");
  const [additionalMessages, setAdditionalMessages] = React.useState("additional messages");
  const [announcement, setAnnouncement] = React.useState<string>();
  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);
  const [isSystemInstructionsReadOnly, setIsSystemInstructionsReadOnly] = React.useState(true);
  const [originalSystemInstructions, setOriginalSystemInstructions] = React.useState(systemInstructions);
  const [isStreamingEnabled, setIsStreamingEnabled] = React.useState(false);
  const [expandedAccordionItems, setExpandedAccordionItems] = React.useState<string[]>(['model-details-item']);

  // State for Checkboxes (using objects for easy lookup)
  const [checkedBuiltInTools, setCheckedBuiltInTools] = React.useState<Record<string, boolean>>({});
  const [checkedMcpServers, setCheckedMcpServers] = React.useState<Record<string, boolean>>({});

  // you will likely want to come up with your own unique id function; this is for demo purposes only
  const generateId = () => {
    const id = Date.now() + Math.random();
    return id.toString();
  };

  const handleSend = (message: string | number) => {
    setIsSendButtonDisabled(true);
    const newMessages: MessageProps[] = [];
    // We can't use structuredClone since messages contains functions, but we can't mutate
    // items that are going into state or the UI won't update correctly
    messages.forEach((msg) => newMessages.push(msg)); // Use msg to avoid shadowing
    // It's important to set a timestamp prop since the Message components re-render.
    // The timestamps re-render with them.
    const currentDate = new Date(); // Use a new variable name
    newMessages.push({
      id: generateId(),
      role: 'user',
      content: message as string,
      name: 'User',
      avatar: UserAvatar,
      timestamp: currentDate.toLocaleString(),
      avatarProps: { isBordered: true }
    });
    newMessages.push({
      id: generateId(),
      role: 'bot',
      content: 'API response goes here',
      name: 'Bot',
      avatar: RobotIcon,
      isLoading: true,
      timestamp: currentDate.toLocaleString()
    });
    setMessages(newMessages);
    // make announcement to assistive devices that new messages have been added
    setAnnouncement(`Message from User: ${message}. Message from Bot is loading.`);

    // this is for demo purposes only; in a real situation, there would be an API response we would wait for
    setTimeout(() => {
      const loadedMessages: MessageProps[] = [];
      // we can't use structuredClone since messages contains functions, but we can't mutate
      // items that are going into state or the UI won't update correctly
      newMessages.forEach((msg) => loadedMessages.push(msg)); // Use msg
      loadedMessages.pop();
      const loadedDate = new Date(); // Use a new variable name
      loadedMessages.push({
        id: generateId(),
        role: 'bot',
        content: 'API response goes here',
        name: 'Bot',
        avatar: RobotIcon,
        isLoading: false,
        actions: {
          // eslint-disable-next-line no-console
          positive: { onClick: () => console.log('Good response') },
          // eslint-disable-next-line no-console
          negative: { onClick: () => console.log('Bad response') },
          // eslint-disable-next-line no-console
          copy: { onClick: () => console.log('Copy') },
          // eslint-disable-next-line no-console
          share: { onClick: () => console.log('Share') },
          // eslint-disable-next-line no-console
          listen: { onClick: () => console.log('Listen') }
        },
        timestamp: loadedDate.toLocaleString()
      });
      setMessages(loadedMessages);
      // make announcement to assistive devices that new message has loaded
      setAnnouncement(`Message from Bot: API response goes here`);
      setIsSendButtonDisabled(false);
    }, 5000);
  };

  // Handlers for System Instructions Edit/Save/Cancel
  const handleEditSystemInstructions = () => {
    setOriginalSystemInstructions(systemInstructions); // Store current value
    setIsSystemInstructionsReadOnly(false); // Enter edit mode
  };

  const handleSaveSystemInstructions = () => {
    setIsSystemInstructionsReadOnly(true); // Exit edit mode, keep current value
    // Optional: Trigger API call or other action to persist the change
  };

  const handleCancelSystemInstructions = () => {
    setSystemInstructions(originalSystemInstructions); // Revert to original value
    setIsSystemInstructionsReadOnly(true); // Exit edit mode
  };

  // Handler for Accordion Toggle
  const handleAccordionToggle = (id: string) => {
    if (expandedAccordionItems.includes(id)) {
      // Remove the ID if it's already expanded (collapse)
      setExpandedAccordionItems(currentExpanded => currentExpanded.filter(itemId => itemId !== id));
    } else {
      // Add the ID if it's not expanded (expand)
      setExpandedAccordionItems(currentExpanded => [...currentExpanded, id]);
    }
  };

  // Checkbox/Switch change handlers
  const handleBuiltInToolChange = (event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    setCheckedBuiltInTools(prev => ({ ...prev, [name]: checked }));
  };

  const handleMcpServerChange = (event: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    setCheckedMcpServers(prev => ({ ...prev, [name]: checked }));
  };

  // Settings Panel Content (Accordion) - unchanged logic, just defined here
  const settingsPanelContent = (
    <DrawerPanelContent isResizable={true} defaultSize={'400px'} minSize={'300px'}>
      <DrawerPanelBody>
        <Accordion asDefinitionList={false}>
          {/* Model Details Accordion Item */}
          <AccordionItem isExpanded={expandedAccordionItems.includes('model-details-item')}>
            <AccordionToggle onClick={() => handleAccordionToggle('model-details-item')} id="model-details-item" > 
              <Title headingLevel="h1" size="xl"> Model details </Title> 
            </AccordionToggle>
            <AccordionContent id="model-details-content" className="pf-v6-u-p-md">
              <Form>
                <FormGroup label="Model" fieldId="model-select"> 
                  <FormSelect value={selectedModel} onChange={(_event, value) => setSelectedModel(value)} aria-label="Select Model" > 
                    <FormSelectOption key={0} value="" label="Select a model" isDisabled /> 
                    <FormSelectOption key={1} value="model-a" label="Model A (GPT-4)" /> 
                    <FormSelectOption key={2} value="model-b" label="Model B (Claude)" /> 
                    <FormSelectOption key={3} value="model-c" label="Model C (Gemini)" /> 
                  </FormSelect> 
                </FormGroup>
                <FormGroup label="System instructions" fieldId="system-instructions"> 
                  <InputGroup> 
                    <TextInput id="system-instructions-input" type="text" value={systemInstructions} onChange={(_event, value) => setSystemInstructions(value)} aria-label="System instructions input" {...(isSystemInstructionsReadOnly && {readOnlyVariant: "default"})} /> 
                    {isSystemInstructionsReadOnly ? ( 
                      <Button variant={ButtonVariant.plain} aria-label="Edit system instructions" onClick={handleEditSystemInstructions} > <PencilAltIcon /> </Button> 
                    ) : ( 
                      <Split> 
                        <SplitItem> 
                          <Button variant={ButtonVariant.plain} aria-label="Save system instructions" onClick={handleSaveSystemInstructions}> 
                            <CheckIcon /> 
                          </Button>
                        </SplitItem>
                        <SplitItem>
                          <Button variant={ButtonVariant.plain} aria-label="Cancel editing system instructions" onClick={handleCancelSystemInstructions}> <TimesIcon /> </Button> 
                        </SplitItem>
                      </Split> 
                    )} 
                  </InputGroup> 
                </FormGroup>
                <FormGroup label="Additional messages" fieldId="additional-messages"> 
                  <TextInput id="additional-messages-input" type="text" value={additionalMessages} onChange={(_event, value) => setAdditionalMessages(value)} aria-label="Additional messages" /> 
                </FormGroup>
                {createSliderGroup("slider-1", "Temperature", slider1Value, slider1InputValue, setSlider1Value, setSlider1InputValue)}
                {createSliderGroup("slider-2", "Top P", slider2Value, slider2InputValue, setSlider2Value, setSlider2InputValue)}
                {createSliderGroup("slider-3", "Max Tokens", slider3Value, slider3InputValue, setSlider3Value, setSlider3InputValue)}
                {createSliderGroup("slider-4", "Frequency Penalty", slider4Value, slider4InputValue, setSlider4Value, setSlider4InputValue)}
                <FormGroup fieldId="streaming-switch"> 
                  <Switch id="streaming-switch" label="Streaming" aria-label="Toggle streaming" isChecked={isStreamingEnabled} hasCheckIcon isReversed onChange={(_event, checked) => setIsStreamingEnabled(checked)} /> 

                </FormGroup>
              </Form>
            </AccordionContent>
          </AccordionItem>
          {/* Configuration Accordion Item */}
          <AccordionItem isExpanded={expandedAccordionItems.includes('configuration-item')}>
            <AccordionToggle onClick={() => handleAccordionToggle('configuration-item')} id="configuration-item" > <Title headingLevel="h1" size="xl"> Configuration </Title> </AccordionToggle>
            <AccordionContent id="configuration-content" className="pf-v6-u-p-md">
              <Form>
                 <FormGroup label="Built-in tools" fieldId="builtin-tools-group"> 
                  <Stack> 
                    {builtInTools.map(tool => ( 
                      <StackItem key={tool.id}> 
                        <Switch id={tool.id} label={tool.label} aria-label={`Enable ${tool.label}`} name={tool.id} isChecked={checkedBuiltInTools[tool.id] || false} onChange={handleBuiltInToolChange} hasCheckIcon /> 
                      </StackItem> 
                    ))} 
                  </Stack> 
                 </FormGroup>
                 <FormGroup label="MCP servers" fieldId="mcp-servers-group"> 
                  <Stack> 
                    {mcpServers.map(server => ( 
                      <StackItem key={server.id}> 
                        <Switch id={server.id} label={server.label} aria-label={`Enable ${server.label}`} name={server.id} isChecked={checkedMcpServers[server.id] || false} onChange={handleMcpServerChange} hasCheckIcon /> 
                      </StackItem> 
                    ))} 
                  </Stack>
                </FormGroup>
              </Form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  // Chatbot component structure remains largely the same
  const chatbotComponent = (
     <Chatbot
        displayMode={ChatbotDisplayMode.embedded}
      >
        <ChatbotContent>
          <MessageBox announcement={announcement}>
            <ChatbotWelcomePrompt
              title="Hi, Llama Stack User!"
              description="How can I help you today?"
            />
            {messages.map((message, index) => {
              if (index === messages.length - 1) {
                return (
                  <React.Fragment key={message.id}>
                    <div ref={scrollToBottomRef}></div>
                    <Message {...message} />
                  </React.Fragment>
                );
              }
              return <Message key={message.id} {...message} />;
            })}
          </MessageBox>
        </ChatbotContent>
        <ChatbotFooter>
          <MessageBar
            onSendMessage={handleSend}
            hasMicrophoneButton
            isSendButtonDisabled={isSendButtonDisabled}
          />
          <ChatbotFootnote {...footnoteProps} />
        </ChatbotFooter>
      </Chatbot>
  );

  return (
    // PageSection is now the main container
    <PageSection
      hasBodyWrapper={false}
      isFilled
      padding={{ default: 'noPadding' }} // Remove default padding to allow drawer edges to align
      style={{ height: '100%', position: 'relative' }} // Needed for potential absolute positioning within drawer
    >
      {/* Drawer is now INSIDE the PageSection */}
      <Drawer isExpanded={true} isInline={true} position="right">
         {/* DrawerContent wraps the main content (Chatbot) and defines the panel */}
         <DrawerContent panelContent={settingsPanelContent}>
            {/* The main content area of the drawer holds the Chatbot */}
            <DrawerContentBody style={{ overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}> {/* Control overflow and layout */}
               {chatbotComponent}
            </DrawerContentBody>
         </DrawerContent>
      </Drawer>
    </PageSection>
  );
};

export { Dashboard };
