import * as React from 'react';
import {
  PageSection,
  Title,
  Content
} from '@patternfly/react-core';

const Documentation: React.FunctionComponent = () => (
  <PageSection hasBodyWrapper={true}>
    <Title headingLevel="h1" size="lg">Documentation</Title>

    <Content style={{ marginTop: 'var(--pf-v5-global--spacer--lg)' }}>
      <p>
        This application utilizes the PatternFly Chatbot component to provide an interactive experience.
        The PatternFly Chatbot offers a range of features beyond basic text messaging.
      </p>
      <p>
        Key capabilities include:
      </p>
      <ul>
        <li><strong>Streaming Responses:</strong> Displaying responses as they are generated, providing a more dynamic interaction.</li>
        <li><strong>Rich Content Types:</strong> Messages can contain various formats beyond simple text, such as Markdown, tables, code blocks, and potentially images.</li>
        <li><strong>Conversation History:</strong> Options for displaying and navigating previous conversations.</li>
        <li><strong>Customizable Actions:</strong> Adding buttons for feedback, copying, sharing, or other custom actions to messages.</li>
      </ul>
      <p>
        For a demonstration of an embedded chatbot similar to the one used in the Playground, refer to the PatternFly documentation:
      </p>
      <p>
        <a href="https://www.patternfly.org/patternfly-ai/chatbot/overview/demo#embedded-chatbot" target="_blank" rel="noopener noreferrer">
          PatternFly Chatbot Demo - Embedded Chatbot
        </a>
      </p>
    </Content>

  </PageSection>
);

export { Documentation }; 