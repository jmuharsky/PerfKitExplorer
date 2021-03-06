"""Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Unit test for data_source_config."""

__author__ = 'joemu@google.com (Joe Allan Muharsky)'

import unittest
import data_source_config
import mox
import os

from perfkit import test_util


class Error(Exception):
  pass


class DataSourceConfigTest(unittest.TestCase):
  UNSUPPORTED = 'unsupported'
  MOCK_CONFIG_FILE = 'config/data_source_config_mock.json'
  ORIGINAL_CONFIG_FILE = data_source_config.CONFIG_FILE

  def setUp(self):
    self.mox = mox.Mox()

    test_util.SetConfigPaths()

    data_source_config.CONFIG_FILE = (
        os.path.join(test_util.GetRootPath(),
                     DataSourceConfigTest.MOCK_CONFIG_FILE))

  def tearDown(self):
    try:
      self.mox.VerifyAll()
    finally:
      self.mox.ResetAll()
      self.mox.UnsetStubs()

    data_source_config.CONFIG_FILE = DataSourceConfigTest.ORIGINAL_CONFIG_FILE

  def testValidUri(self):
    """Verifies the correct uri for a valid environment and service."""

    environment_name = data_source_config.Environments.PRODUCTION
    service_name = data_source_config.Services.PROJECT_ID

    service_uri = data_source_config.Services.GetServiceUri(environment_name,
                                                            service_name)

    self.assertEquals(service_uri, 'DUMMY_PROJECT_ID')

  def testUnsupportedEnvironment(self):
    """Verifies the Error raised when the Environment name is incorrect."""

    if (DataSourceConfigTest.UNSUPPORTED in
        data_source_config.Environments.All()):
      raise Error('testInvalidEnvironment failed: \'unsupported\' should not '
                  'be a valid environment.')

    environment_name = DataSourceConfigTest.UNSUPPORTED
    service_name = data_source_config.Services.PROJECT_ID

    self.assertRaisesRegexp(
        data_source_config.Error,
        'Environment name not supported.',
        data_source_config.Services.GetServiceUri,
        environment_name, service_name)

  def testUnsupportedService(self):
    """Verifies the Error raised when the Service name is incorrect."""

    if (DataSourceConfigTest.UNSUPPORTED in
        data_source_config.Services.All()):
      raise Error('testInvalidService failed: \'unsupported\' should not '
                  'be a valid service.')

    environment_name = data_source_config.Environments.PRODUCTION
    service_name = DataSourceConfigTest.UNSUPPORTED

    self.assertRaisesRegexp(
        data_source_config.Error,
        'Service name not supported.',
        data_source_config.Services.GetServiceUri,
        environment_name, service_name)

  def testEnvironmentNotFound(self):
    """Verifies the Error raised when the environment is correct but missing."""

    self.mox.StubOutWithMock(data_source_config.Environments, 'All')

    data_source_config.Environments.All().AndReturn(
        [DataSourceConfigTest.UNSUPPORTED])
    self.mox.ReplayAll()

    environment_name = DataSourceConfigTest.UNSUPPORTED
    service_name = data_source_config.Services.PROJECT_ID

    self.assertRaisesRegexp(
        data_source_config.Error,
        'Environment name not found.',
        data_source_config.Services.GetServiceUri,
        environment_name, service_name)


  def testServiceNotFound(self):
    """Verifies the Error raised when the service is correct but missing."""

    self.mox.StubOutWithMock(data_source_config.Services, 'All')

    data_source_config.Services.All().AndReturn(
        [DataSourceConfigTest.UNSUPPORTED])
    self.mox.ReplayAll()

    environment_name = data_source_config.Environments.PRODUCTION
    service_name = DataSourceConfigTest.UNSUPPORTED

    self.assertRaisesRegexp(
        data_source_config.Error,
        'Service name not found.',
        data_source_config.Services.GetServiceUri,
        environment_name, service_name)


  def testEnvironmentNotSpecified(self):
    """Verifies the Error raised when the environment name is not provided."""

    environment_name = None
    service_name = data_source_config.Services.PROJECT_ID

    self.assertRaisesRegexp(
        data_source_config.Error,
        'Environment name not provided.',
        data_source_config.Services.GetServiceUri,
        environment_name, service_name)


  def testServiceNotSpecified(self):
    """Verifies the Error raised when the service name is not provided."""

    environment_name = data_source_config.Environments.PRODUCTION
    service_name = None

    self.assertRaisesRegexp(
        data_source_config.Error,
        'Service name not provided.',
        data_source_config.Services.GetServiceUri,
        environment_name, service_name)

  def testEnvironmentsAndServicesExist(self):
    """Verifies that each environment exists and specifies all services."""

    environments = data_source_config.Environments.All()
    config = data_source_config.Services.GetServiceData()

    # Verify that each environment exists.
    for environment_name in environments:
      self.assertTrue(environment_name in config)

      environment = config[environment_name]
      services = data_source_config.Services.All()

      # Verify that each service exists.
      for service_name in services:
        self.assertTrue(service_name in environment,
                        'Service %s not found' % service_name)

      # Verify that there are not more services than supported.
      self.assertEqual(len(environment), len(services))

    # Verify that there are not more environments than supported.
    self.assertEqual(len(config), len(environments))

  def testValidProjectId(self):
    """Ensures the right project_id is returned for a valid env and service."""

    environment_name = data_source_config.Environments.PRODUCTION
    service_name = data_source_config.Services.PROJECT_ID

    service_uri = data_source_config.Services.GetServiceUri(environment_name,
                                                            service_name)

    self.assertEquals(service_uri, 'DUMMY_PROJECT_ID')


if __name__ == '__main__':
  unittest.main()
