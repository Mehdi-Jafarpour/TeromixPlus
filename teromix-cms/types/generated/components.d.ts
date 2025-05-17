import type { Schema, Struct } from '@strapi/strapi';

export interface SharedDimension extends Struct.ComponentSchema {
  collectionName: 'components_shared_dimensions';
  info: {
    description: '';
    displayName: 'dimension';
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    dimension: Schema.Attribute.String;
    inStock: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    weight: Schema.Attribute.Decimal;
    woodType: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.dimension': SharedDimension;
    }
  }
}
