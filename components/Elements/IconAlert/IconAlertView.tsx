import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AsForwarder } from "@gluestack-ui/themed";
import React, { Component } from "react";

const IconAlertView = (props: Component<typeof AsForwarder>) => (
  <MaterialCommunityIcons name="alert" {...props} />
);

export default IconAlertView;
