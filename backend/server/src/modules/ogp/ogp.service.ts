import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as sharp from 'sharp';
import { join } from 'path';

const blue = '#0554F2';

@Injectable()
export class OgpService {
  async generateSquareOgp() {
    const totalPoint = 200;

    const items = [
      {
        rareness: 'special',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'rare',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
      {
        rareness: 'common',
        points: 100,
        tokens: [
          {
            tokenId: 1,
            quantity: 1,
          },
        ],
      },
    ];

    const base = readFileSync(
      join(__dirname, '../../assets/images/ogp/square-base.png'),
    );

    const container = sharp(base);

    const point = await sharp({
      text: {
        text: `<span foreground="${blue}">200</span>`,
        font: 'Albert Sans',
        fontfile: join(__dirname, '../../assets/fonts/AlbertSans-Medium.ttf'),
        rgba: true,
        width: 550,
        height: 90,
      },
    })
      .png()
      .toBuffer();

    const pointLabel = await sharp({
      text: {
        text: `<span foreground="${blue}">POINTS</span>`,
        font: 'Albert Sans',
        fontfile: join(__dirname, '../../assets/fonts/AlbertSans-Regular.ttf'),
        rgba: true,
        width: 150,
        height: 34,
      },
    })
      .png()
      .toBuffer();

    const address = await sharp({
      text: {
        text: `<span foreground="black">0x12...678E</span>`,
        font: 'Albert Sans',
        fontfile: join(__dirname, '../../assets/fonts/AlbertSans-Regular.ttf'),
        rgba: true,
        width: 550,
        height: 28,
      },
    })
      .png()
      .toBuffer();

    const itemsContainer = await Promise.all(
      items.map(async (item, index) => {
        const ballImage = readFileSync(
          join(__dirname, `../../assets/images/ogp/ball_${item.rareness}.png`),
        );
        const ball = await sharp(ballImage).resize(72, 72).png().toBuffer();
        return {
          input: ball,
          left: 50,
          top: 510 + index * 100,
        };
      }),
    );

    container.composite([
      {
        input: point,
        left: 50,
        top: 300,
      },
      {
        ...pointLabelPosition(totalPoint),
        input: pointLabel,
      },
      {
        input: address,
        left: 53,
        top: 425,
      },
      ...itemsContainer,
    ]);

    const buffer = await container.toBuffer();
    return buffer;
  }
}

const pointLabelPosition = (point: number) => {
  switch (true) {
    case point > 99:
      return { left: 300, top: 357 };
    case point > 999:
      return { left: 330, top: 357 };
    case point > 9999:
      return { left: 360, top: 357 };
    default:
      return { left: 300, top: 357 };
  }
};
