// 引入容器组件的属性和外观
import {
  ContainerOrdinaryAppearance,
  ContainerOrdinaryProperty,
} from "../components/erComponent/containers/container-ordinary";
import {
  ContainerFreeAppearance,
  ContainerFreeProperty,
} from "../components/erComponent/containers/container-free";

// 引入常用组件的属性和外观
import {
  TextAppearance,
  TextProperty,
} from "../components/erComponent/commons/text";
import {
  ButtonAppearance,
  ButtonProperty,
} from "../components/erComponent/commons/button";
import {
  InputAppearance,
  InputProperty,
} from "../components/erComponent/commons/input";
import {
  SelectAppearance,
  SelectProperty,
} from "../components/erComponent/commons/select";

import {
  TextBoxAppearance,
  TextBoxProperty,
} from "../components/erComponent/form/textBox";
import {
  MultilineTextAppearance,
  MultilineTextProperty,
} from "../components/erComponent/form/multilineText";

import {
  IconAppearance,
  IconProperty
}from "../components/erComponent/erIcon/icon";

import {
  RadioAppearance,
  RadioProperty
}from "../components/erComponent/form/radio";

import {
  CheckboxesAppearance,
  CheckboxesProperty
}from "../components/erComponent/form/checkboxes";

interface ErcomponentConfig {
  type: string; //类型
  Properties?: (selectedComponent:Object) => any; //属性
  appearances?: (selectedComponent:Object) => any; //外观
}

// 组件的配置信息集合
const ErcomponentConfigList = [
  {
    type: "container-ordinary",
    Properties(selectedComponent:Object) {
      return <ContainerOrdinaryProperty option={selectedComponent}></ContainerOrdinaryProperty>;
    },
    appearances(selectedComponent:Object) {
      return <ContainerOrdinaryAppearance option={selectedComponent}></ContainerOrdinaryAppearance>;
    },
  },
  {
    type: "container-free",
    Properties(selectedComponent:Object) {
      return <ContainerFreeProperty option={selectedComponent}></ContainerFreeProperty>;
    },
    appearances(selectedComponent:Object) {
      return <ContainerFreeAppearance option={selectedComponent}></ContainerFreeAppearance>;
    },
  },
  {
    type: "text",
    Properties(selectedComponent:Object) {
      return <TextProperty option={selectedComponent}></TextProperty>;
    },
    appearances(selectedComponent:Object) {
      return <TextAppearance option={selectedComponent}></TextAppearance>;
    },
  },
  {
    type: "button",
    Properties(selectedComponent:Object) {
      return <ButtonProperty option={selectedComponent}></ButtonProperty>;
    },
    appearances(selectedComponent:Object) {
      return <ButtonAppearance option={selectedComponent}></ButtonAppearance>;
    },
  },
  {
    type: "input",
    Properties(selectedComponent:Object) {
      return <InputProperty option={selectedComponent}></InputProperty>;
    },
    appearances(selectedComponent:Object) {
      return <InputAppearance option={selectedComponent}></InputAppearance>;
    },
  },
  {
    type: "select",
    Properties(selectedComponent:Object) {
      return <SelectProperty option={selectedComponent}></SelectProperty>;
    },
    appearances(selectedComponent:Object) {
      return <SelectAppearance option={selectedComponent}></SelectAppearance>;
    },
  },
  {
    type: "textBox",
    Properties(selectedComponent:Object) {
      return <TextBoxProperty option={selectedComponent}></TextBoxProperty>;
    },
    appearances(selectedComponent:Object) {
      return <TextBoxAppearance option={selectedComponent}></TextBoxAppearance>;
    },
  },
  {
    type: "multilineText",
    Properties(selectedComponent:Object) {
      return <MultilineTextProperty option={selectedComponent}></MultilineTextProperty>;
    },
    appearances(selectedComponent:Object) {
      return <MultilineTextAppearance option={selectedComponent}></MultilineTextAppearance>;
    },
  },
  {
    type: "icon",
    Properties(selectedComponent:Object) {
      return <IconProperty option={selectedComponent}></IconProperty>;
    },
    appearances(selectedComponent:Object) {
      return <IconAppearance option={selectedComponent}></IconAppearance>;
    },
  },
  {
    type: "radio",
    Properties(selectedComponent:Object) {
      return <RadioProperty option={selectedComponent}></RadioProperty>;
    },
    appearances(selectedComponent:Object) {
      return <RadioAppearance option={selectedComponent}></RadioAppearance>;
    },
  },
  {
    type: "checkboxes",
    Properties(selectedComponent:Object) {
      return <CheckboxesProperty option={selectedComponent}></CheckboxesProperty>;
    },
    appearances(selectedComponent:Object) {
      return <CheckboxesAppearance option={selectedComponent}></CheckboxesAppearance>;
    },
  },
];

class createErComponentConfig {
  public componentMap: Map<string, ErcomponentConfig>; //组件映射表

  constructor(componentMap: Map<string, ErcomponentConfig> = new Map()) {
    this.componentMap = componentMap;
  }

  register(component: ErcomponentConfig) {
    this.componentMap.set(component.type, component);
  }
}

export const erConfig = new createErComponentConfig();

// 循环注册组件配置信息
for (let perErcomponent of ErcomponentConfigList) {
  erConfig.register({
    type: perErcomponent.type,
    Properties: (selectedComponent:Object) => perErcomponent.Properties(selectedComponent),
    appearances: (selectedComponent:Object) => perErcomponent.appearances(selectedComponent),
  });
}


