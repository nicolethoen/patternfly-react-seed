import * as React from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
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
  Grid,
  GridItem,
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
} from '@patternfly/react-icons';
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

const Dashboard: React.FunctionComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState('Granite 7B');
  const [messages, setMessages] = React.useState<any[]>([]);
  const [announcement, setAnnouncement] = React.useState('');
  const [isSendButtonDisabled, setIsSendButtonDisabled] = React.useState(false);

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
          <Grid hasGutter>
            {/* Status Cards */}
            <GridItem lg={3} md={6} sm={12}>
              <CompassPanel>
                <Card isPlain isFullHeight>
                  <CardTitle>
                    <Flex alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem>
                        <CheckCircleIcon color="var(--pf-t--global--icon--color--status--success--default)" />
                      </FlexItem>
                      <FlexItem>System Health</FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <Title headingLevel="h2" size="2xl">
                      98.5%
                    </Title>
                    <Label color="green">Operational</Label>
                  </CardBody>
                </Card>
              </CompassPanel>
            </GridItem>
            <GridItem lg={3} md={6} sm={12}>
              <CompassPanel>
                <Card isPlain isFullHeight>
                  <CardTitle>Active Users</CardTitle>
                  <CardBody>
                    <Title headingLevel="h2" size="2xl">
                      1,284
                    </Title>
                    <Badge>+12% this week</Badge>
                  </CardBody>
                </Card>
              </CompassPanel>
            </GridItem>
            <GridItem lg={3} md={6} sm={12}>
              <CompassPanel>
                <Card isPlain isFullHeight>
                  <CardTitle>
                    <Flex alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem>
                        <ExclamationTriangleIcon color="var(--pf-t--global--icon--color--status--warning--default)" />
                      </FlexItem>
                      <FlexItem>Warnings</FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <Title headingLevel="h2" size="2xl">
                      3
                    </Title>
                    <Label color="orange">Needs attention</Label>
                  </CardBody>
                </Card>
              </CompassPanel>
            </GridItem>
            <GridItem lg={3} md={6} sm={12}>
              <CompassPanel>
                <Card isPlain isFullHeight>
                  <CardTitle>
                    <Flex alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem>
                        <InfoCircleIcon color="var(--pf-t--global--icon--color--status--info--default)" />
                      </FlexItem>
                      <FlexItem>Active Tasks</FlexItem>
                    </Flex>
                  </CardTitle>
                  <CardBody>
                    <Title headingLevel="h2" size="2xl">
                      42
                    </Title>
                    <Label color="blue">In progress</Label>
                  </CardBody>
                </Card>
              </CompassPanel>
            </GridItem>

            {/* Resource Utilization */}
            <GridItem span={6}>
              <CompassPanel>
                <Card isPlain isFullHeight>
                  <CardTitle>Resource Utilization</CardTitle>
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
              </CompassPanel>
            </GridItem>

            {/* System Information */}
            <GridItem span={6}>
              <CompassPanel>
                <Card isPlain isFullHeight>
                  <CardTitle>System Information</CardTitle>
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
              </CompassPanel>
            </GridItem>
          </Grid>
        </CompassContent>
      </DrawerContent>
    </Drawer>
  );
};

export { Dashboard };
