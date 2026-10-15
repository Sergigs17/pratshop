# VerdeVivo — PratShop v1

Botiga en línia de plantes i decoració per a la llar, desenvolupada amb React, TypeScript i Vite.

## Descripció

VerdeVivo és una botiga online amb un catàleg de productes, cerca i filtres per categoria, fitxes de detall, carro de compra i formulari de finalització de compra.

## Tecnologies

- React
- TypeScript
- Vite
- React Router
- CSS Modules
- clsx
- localStorage per persistir el carro de compra

## Funcionalitats

- Catàleg amb cerca i filtres per categoria.
- Fitxa individual de cada producte.
- Indicació de productes esgotats.
- Carro amb canvi de quantitats, eliminació de productes i càlcul del total.
- Persistència del carro al navegador.
- Formulari de compra amb validació.
- Pàgina de confirmació de comanda.
- Pàgina 404 per a rutes inexistents.
- Interfície adaptable a diferents mides de pantalla.

## Instal·lació i execució

Requisits: Node.js i npm.

```bash
npm install
npm run dev
```

## Comprovacions

```bash
npm run build
npm run lint
```

## Disseny

- **Arxiu de Penpot:** [Veure disseny de VerdeVivo](https://design.penpot.app/#/view?file-id=129977ce-683b-806a-8008-cb7a0606fed4&page-id=129977ce-683b-806a-8008-cb7a0606fed5&section=interactions&frame-id=a2f5fca5-470b-808f-8008-cb7c30491383&index=0&share-id=86ee6f83-3406-4eeb-8ff5-e5c362fef1cc)

- **Captures de disseny:** `docs/disseny/`
- **Codi generat:** `docs/generat/`

## Adaptacions del disseny

Documentaré aquí almenys tres adaptacions fetes en integrar el disseny amb l'aplicació React:

1. **Disseny responsive:** adaptació de la distribució del catàleg i les targetes per a pantalles petites.
2. **Estats dels productes:** incorporació de la disponibilitat d'estoc i desactivació de la compra dels productes esgotats.
3. **Integració funcional:** adaptació dels botons, filtres i controls del disseny perquè funcionin amb les rutes i l'estat compartit del carro.

*Revisa aquests punts i ajusta'ls si alguna adaptació no coincideix amb els canvis que has fet realment.*

## Ús d'intel·ligència artificial

S'han utilitzat eines d'intel·ligència artificial com a suport durant el desenvolupament i la preparació del disseny. El codi i les propostes s'han revisat i adaptat al projecte.

## Proves

| Núm. | Cas de prova | Resultat esperat |
|---|---|---|
| 1 | Obrir el catàleg | Es mostren els productes disponibles. |
| 2 | Cercar un producte pel nom | Es mostren els productes coincidents. |
| 3 | Filtrar per categoria | Només es mostren els productes de la categoria seleccionada. |
| 4 | Obrir el detall d'un producte | Es mostren les dades del producte seleccionat. |
| 5 | Intentar comprar un producte esgotat | No es permet afegir-lo al carro. |
| 6 | Afegir un producte al carro i canviar-ne la quantitat | S'actualitzen la quantitat i el subtotal. |
| 7 | Completar el formulari de compra amb dades vàlides | Es mostra la confirmació de la comanda. |
| 8 | Accedir a una ruta inexistent | Es mostra la pàgina 404. |

Les proves funcionals s'han de verificar manualment abans del lliurament. La compilació de producció s'ha comprovat amb `npm run build`.

## Autoría

Projecte acadèmic: PR1 — PratShop v1.