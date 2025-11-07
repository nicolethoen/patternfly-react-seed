import * as React from 'react';
import { CompassContent, CompassMainHeader, CompassPanel, Form, FormGroup, Switch, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { useTheme } from '@app/utils/ThemeContext';

const GeneralSettings: React.FunctionComponent = () => {
  useDocumentTitle('General Settings');
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <>
      <CompassMainHeader title={<Title headingLevel="h1">General Settings</Title>} />
      <CompassContent>
        <CompassPanel>
          <Form>
          <FormGroup label="Theme" fieldId="theme-toggle">
            <Switch
              id="theme-toggle"
              label={isDarkTheme ? 'Dark mode enabled' : 'Light mode enabled'}
              isChecked={isDarkTheme}
              onChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </FormGroup>
          </Form>
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { GeneralSettings };
