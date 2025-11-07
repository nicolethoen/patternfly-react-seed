import * as React from 'react';
import { CompassContent, CompassMainHeader, CompassPanel, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const GeneralSettings: React.FunctionComponent = () => {
  useDocumentTitle('General Settings');
  
  return (
    <CompassContent>
      <CompassMainHeader title={<Title headingLevel="h1">General Settings</Title>} />
      <CompassPanel>
        Some general settings stuff here...
      </CompassPanel>
    </CompassContent>
  );
};

export { GeneralSettings };
