import { createElement } from 'react';
import ReactDOM from 'react-dom';

const _componentMap = new WeakMap();

class ReactJsonSchema {
  // tslint:disable-next-line:no-any
  parseSchema(schema: any): any {
    let element = null;
    let elements = null;
    if (Array.isArray(schema)) {
      elements = this.parseSubSchemas(schema);
    } else {
      element = this.createComponent(schema);
    }
    return element || elements;
  }

  // tslint:disable-next-line:no-any
  parseSubSchemas(subSchemas: any[] = []): any {
    const Components = [];
    let index = 0;
    for (const subSchema of subSchemas) {
      subSchema.key =
        typeof subSchema.key !== 'undefined' ? subSchema.key : index;
      Components.push(this.parseSchema(subSchema));
      index++;
    }
    return Components;
  }

  // tslint:disable-next-line:no-any
  createComponent(schema: any) {
    const { component, children, text, ...rest } = schema;
    const Component = this.resolveComponent(schema);
    const Children =
      typeof text !== 'undefined'
        ? text
        : this.resolveComponentChildren(schema);
    return createElement(Component, rest, Children);
  }

  // tslint:disable-next-line:no-any
  resolveComponent(schema: any) {
    const componentMap = this.getComponentMap();
    let Component = null;
    if (schema.hasOwnProperty('component')) {
      if (schema.component === Object(schema.component)) {
        Component = schema.component;
      } else if (componentMap && componentMap[schema.component]) {
        Component = componentMap[schema.component];
      } else if (ReactDOM.hasOwnProperty(schema.component)) {
        Component = schema.component;
      }
    } else {
      // tslint:disable-next-line:max-line-length
      throw new Error(
        'ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.'
      );
    }
    return Component;
  }

  // tslint:disable-next-line:no-any
  resolveComponentChildren(schema: any) {
    return schema.hasOwnProperty('children')
      ? this.parseSchema(schema.children)
      : [];
  }

  getComponentMap() {
    return _componentMap.get(this);
  }

  // tslint:disable-next-line:no-any
  setComponentMap(componentMap: any) {
    _componentMap.set(this, componentMap);
  }
}

export default ReactJsonSchema;