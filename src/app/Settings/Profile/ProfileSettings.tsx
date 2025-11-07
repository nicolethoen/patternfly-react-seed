import * as React from 'react';
import { CompassContent, CompassMainHeader, CompassPanel, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const ProfileSettings: React.FunctionComponent = () => {
  useDocumentTitle('Profile Settings');

  return (
    <>
      <CompassMainHeader title={<Title headingLevel="h1">Profile Settings</Title>} />
      <CompassContent>
        <CompassPanel>
          Some profile settings stuff here...
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { ProfileSettings };
