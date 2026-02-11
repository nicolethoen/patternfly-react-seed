import * as React from 'react';
import {
  Badge,
  Card,
  CardBody,
  CompassContent,
  CompassPanel,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Drawer,
  DrawerContent,
  DrawerPanelContent,
  DropdownItem,
  DropdownList,
  Flex,
  FlexItem,
  Label,
  Progress,
  ProgressSize,
  ProgressVariant,
  Title,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
  ChartLineIcon,
  UsersIcon,
  CubesIcon,
  ServerIcon,
} from '@patternfly/react-icons';
import { WidgetLayout, WidgetMapping, ExtendedTemplateConfig } from '@patternfly/widgetized-dashboard';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import ChatbotContent from '@patternfly/chatbot/dist/dynamic/ChatbotContent';
import ChatbotWelcomePrompt from '@patternfly/chatbot/dist/dynamic/ChatbotWelcomePrompt';
import ChatbotFooter, { ChatbotFootnote } from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import MessageBar from '@patternfly/chatbot/dist/dynamic/MessageBar';
import MessageBox from '@patternfly/chatbot/dist/dynamic/MessageBox';
import Message from '@patternfly/chatbot/dist/dynamic/Message';
import ChatbotHeader, {
  ChatbotHeaderMenu,
  ChatbotHeaderMain,
  ChatbotHeaderTitle,
  ChatbotHeaderActions,
  ChatbotHeaderSelectorDropdown,
} from '@patternfly/chatbot/dist/dynamic/ChatbotHeader';

// Widget Components
const SystemHealthWidget = () => (
  <Card isPlain isFullHeight>
    <CardBody>
      <Flex alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: '1rem' }}>
        <FlexItem>
          <CheckCircleIcon color="var(--pf-t--global--icon--color--status--success--default)" />
        </FlexItem>
      </Flex>
      <Title headingLevel="h2" size="2xl">
        98.5%
      </Title>
      <Label color="green">Operational</Label>
    </CardBody>
  </Card>
);

const ActiveUsersWidget = () => (
  <Card isPlain isFullHeight>
    <CardBody>
      <Title headingLevel="h2" size="2xl">
        1,284
      </Title>
      <Badge>+12% this week</Badge>
    </CardBody>
  </Card>
);

const WarningsWidget = () => (
  <Card isPlain isFullHeight>
    <CardBody>
      <Flex alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: '1rem' }}>
        <FlexItem>
          <ExclamationTriangleIcon color="var(--pf-t--global--icon--color--status--warning--default)" />
        </FlexItem>
      </Flex>
      <Title headingLevel="h2" size="2xl">
        3
      </Title>
      <Label color="orange">Needs attention</Label>
    </CardBody>
  </Card>
);

const ActiveTasksWidget = () => (
  <Card isPlain isFullHeight>
    <CardBody>
      <Flex alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: '1rem' }}>
        <FlexItem>
          <InfoCircleIcon color="var(--pf-t--global--icon--color--status--info--default)" />
        </FlexItem>
      </Flex>
      <Title headingLevel="h2" size="2xl">
        42
      </Title>
      <Label color="blue">In progress</Label>
    </CardBody>
  </Card>
);

const ResourceUtilizationWidget = () => (
  <Card isPlain isFullHeight>
    <CardBody>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>CPU Usage</div>
        <Progress value={45} title="CPU" size={ProgressSize.sm} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>Memory</div>
        <Progress value={51} title="Memory" size={ProgressSize.sm} variant={ProgressVariant.warning} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>Storage</div>
        <Progress value={78} title="Storage" size={ProgressSize.sm} variant={ProgressVariant.danger} />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem' }}>Network</div>
        <Progress value={32} title="Network" size={ProgressSize.sm} variant={ProgressVariant.success} />
      </div>
    </CardBody>
  </Card>
);

const SystemInformationWidget = () => (
  <Card isPlain isFullHeight>
    <CardBody>
      <DescriptionList>
        <DescriptionListGroup>
          <DescriptionListTerm>Hostname</DescriptionListTerm>
          <DescriptionListDescription>prod-server-01</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>IP Address</DescriptionListTerm>
          <DescriptionListDescription>192.168.1.100</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Operating System</DescriptionListTerm>
          <DescriptionListDescription>Red Hat Enterprise Linux 9.2</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Uptime</DescriptionListTerm>
          <DescriptionListDescription>15 days, 7 hours, 23 minutes</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Last Backup</DescriptionListTerm>
          <DescriptionListDescription>2 hours ago</DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </CardBody>
  </Card>
);

// Widget Mapping
const widgetMapping: WidgetMapping = {
  'system-health': {
    defaults: { w: 1, h: 3, maxH: 6, minH: 2 },
    config: {
      title: 'System Health',
      icon: <CheckCircleIcon />,
    },
    renderWidget: () => <SystemHealthWidget />,
  },
  'active-users': {
    defaults: { w: 1, h: 3, maxH: 6, minH: 2 },
    config: {
      title: 'Active Users',
      icon: <UsersIcon />,
    },
    renderWidget: () => <ActiveUsersWidget />,
  },
  'warnings': {
    defaults: { w: 1, h: 3, maxH: 6, minH: 2 },
    config: {
      title: 'Warnings',
      icon: <ExclamationTriangleIcon />,
    },
    renderWidget: () => <WarningsWidget />,
  },
  'active-tasks': {
    defaults: { w: 1, h: 3, maxH: 6, minH: 2 },
    config: {
      title: 'Active Tasks',
      icon: <CubesIcon />,
    },
    renderWidget: () => <ActiveTasksWidget />,
  },
  'resource-utilization': {
    defaults: { w: 2, h: 4, maxH: 8, minH: 3 },
    config: {
      title: 'Resource Utilization',
      icon: <ChartLineIcon />,
    },
    renderWidget: () => <ResourceUtilizationWidget />,
  },
  'system-information': {
    defaults: { w: 2, h: 4, maxH: 8, minH: 3 },
    config: {
      title: 'System Information',
      icon: <ServerIcon />,
    },
    renderWidget: () => <SystemInformationWidget />,
  },
};

// Initial Template Configuration
const initialTemplate: ExtendedTemplateConfig = {
  xl: [
    { i: 'system-health#1', x: 0, y: 0, w: 1, h: 3, widgetType: 'system-health', title: 'System Health' },
    { i: 'active-users#1', x: 1, y: 0, w: 1, h: 3, widgetType: 'active-users', title: 'Active Users' },
    { i: 'warnings#1', x: 2, y: 0, w: 1, h: 3, widgetType: 'warnings', title: 'Warnings' },
    { i: 'active-tasks#1', x: 3, y: 0, w: 1, h: 3, widgetType: 'active-tasks', title: 'Active Tasks' },
    { i: 'resource-utilization#1', x: 0, y: 3, w: 2, h: 4, widgetType: 'resource-utilization', title: 'Resource Utilization' },
    { i: 'system-information#1', x: 2, y: 3, w: 2, h: 4, widgetType: 'system-information', title: 'System Information' },
  ],
  lg: [
    { i: 'system-health#1', x: 0, y: 0, w: 1, h: 3, widgetType: 'system-health', title: 'System Health' },
    { i: 'active-users#1', x: 1, y: 0, w: 1, h: 3, widgetType: 'active-users', title: 'Active Users' },
    { i: 'warnings#1', x: 0, y: 3, w: 1, h: 3, widgetType: 'warnings', title: 'Warnings' },
    { i: 'active-tasks#1', x: 1, y: 3, w: 1, h: 3, widgetType: 'active-tasks', title: 'Active Tasks' },
    { i: 'resource-utilization#1', x: 0, y: 6, w: 2, h: 4, widgetType: 'resource-utilization', title: 'Resource Utilization' },
    { i: 'system-information#1', x: 0, y: 10, w: 2, h: 4, widgetType: 'system-information', title: 'System Information' },
  ],
  md: [
    { i: 'system-health#1', x: 0, y: 0, w: 1, h: 3, widgetType: 'system-health', title: 'System Health' },
    { i: 'active-users#1', x: 1, y: 0, w: 1, h: 3, widgetType: 'active-users', title: 'Active Users' },
    { i: 'warnings#1', x: 0, y: 3, w: 1, h: 3, widgetType: 'warnings', title: 'Warnings' },
    { i: 'active-tasks#1', x: 1, y: 3, w: 1, h: 3, widgetType: 'active-tasks', title: 'Active Tasks' },
    { i: 'resource-utilization#1', x: 0, y: 6, w: 2, h: 4, widgetType: 'resource-utilization', title: 'Resource Utilization' },
    { i: 'system-information#1', x: 0, y: 10, w: 2, h: 4, widgetType: 'system-information', title: 'System Information' },
  ],
  sm: [
    { i: 'system-health#1', x: 0, y: 0, w: 1, h: 3, widgetType: 'system-health', title: 'System Health' },
    { i: 'active-users#1', x: 0, y: 3, w: 1, h: 3, widgetType: 'active-users', title: 'Active Users' },
    { i: 'warnings#1', x: 0, y: 6, w: 1, h: 3, widgetType: 'warnings', title: 'Warnings' },
    { i: 'active-tasks#1', x: 0, y: 9, w: 1, h: 3, widgetType: 'active-tasks', title: 'Active Tasks' },
    { i: 'resource-utilization#1', x: 0, y: 12, w: 1, h: 4, widgetType: 'resource-utilization', title: 'Resource Utilization' },
    { i: 'system-information#1', x: 0, y: 16, w: 1, h: 4, widgetType: 'system-information', title: 'System Information' },
  ],
};

const Dashboard2: React.FunctionComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState('Granite 7B');
  const [messages, setMessages] = React.useState<any[]>([]);
  const [announcement, setAnnouncement] = React.useState('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] = React.useState(false);
  const [template, setTemplate] = React.useState(initialTemplate);

  const historyRef = React.useRef<HTMLButtonElement>(null);
  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);

  const welcomePrompts = [
    { title: 'System Status', message: 'What is the current system health?' },
    { title: 'Resource Usage', message: 'Show me resource utilization details' },
    { title: 'Active Tasks', message: 'What tasks are currently in progress?' },
  ];

  const footnoteProps = {
    label: 'Verify all information',
    popover: {
      title: 'Verify accuracy',
      description:
        'While I strive for accuracy, I can make mistakes. Please verify all information provided.',
    },
  };

  const onSelectModel = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    setSelectedModel(value as string);
  };

  const handleSend = (message: string | number) => {
    setIsSendButtonDisabled(true);
    const messageContent = String(message);
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      name: 'User',
      avatar: '',
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setAnnouncement(`Message sent: ${messageContent}`);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `I received your message: "${messageContent}". This is a demo response from the dashboard assistant.`,
        name: 'Dashboard Assistant',
        avatar: '',
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setAnnouncement(`Message received from Dashboard Assistant`);
      setIsSendButtonDisabled(false);

      // Scroll to bottom after bot responds
      setTimeout(() => {
        scrollToBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };

  const iconLogo = <Title headingLevel="h1">Dashboard Assistant</Title>;

  const panelContent = (
    <DrawerPanelContent isResizable>
      <Chatbot displayMode={ChatbotDisplayMode.embedded}>
        <ChatbotHeader>
          <ChatbotHeaderMain>
            <ChatbotHeaderMenu
              ref={historyRef}
              aria-expanded={isDrawerOpen}
              onMenuToggle={() => setIsDrawerOpen(!isDrawerOpen)}
            />
            <ChatbotHeaderTitle>{iconLogo}</ChatbotHeaderTitle>
          </ChatbotHeaderMain>
          <ChatbotHeaderActions>
            <ChatbotHeaderSelectorDropdown value={selectedModel} onSelect={onSelectModel}>
              <DropdownList>
                <DropdownItem value="Granite 7B" key="granite">
                  Granite 7B
                </DropdownItem>
                <DropdownItem value="Llama 3.0" key="llama">
                  Llama 3.0
                </DropdownItem>
                <DropdownItem value="Mistral 3B" key="mistral">
                  Mistral 3B
                </DropdownItem>
              </DropdownList>
            </ChatbotHeaderSelectorDropdown>
          </ChatbotHeaderActions>
        </ChatbotHeader>
        <ChatbotContent isPrimary>
          <MessageBox announcement={announcement}>
            <ChatbotWelcomePrompt
              title="Hello, Chatbot User"
              description="How may I help you today?"
              prompts={welcomePrompts}
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
        <ChatbotFooter isPrimary>
          <MessageBar hasAiIndicator onSendMessage={handleSend} hasMicrophoneButton isSendButtonDisabled={isSendButtonDisabled} />
          <ChatbotFootnote {...footnoteProps} />
        </ChatbotFooter>
      </Chatbot>
    </DrawerPanelContent>
  );

  return (
    <Drawer isExpanded isInline position="start" isPill>
      <DrawerContent panelContent={panelContent}>
        <CompassContent>
          <CompassPanel>
            <div style={{ height: '100vh', width: '100%', overflow: 'auto', position: 'relative' }}>
              <WidgetLayout
                widgetMapping={widgetMapping}
                initialTemplate={template}
                onTemplateChange={setTemplate}
                showDrawer={false}
              />
            </div>
          </CompassPanel>
        </CompassContent>
      </DrawerContent>
    </Drawer>
  );
};

export { Dashboard2 };
