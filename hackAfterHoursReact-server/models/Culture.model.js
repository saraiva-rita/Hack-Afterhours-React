const { Schema, model } = require('mongoose');

const cultureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    miniDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    spotUrl: {
      type: String,
    },
    imgUrl: {
      type: String,
      default: './public/images/img-default.png',
    },
    schedule: {
      type: String,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Culture = model('Culture', cultureSchema);

module.exports = Culture;
