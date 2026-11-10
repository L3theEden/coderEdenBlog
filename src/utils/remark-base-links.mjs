import { withBasePath } from './base-path.mjs';

/** Add the deployment base to Markdown links, images and link definitions. */
export default function remarkBaseLinks({ base }) {
  return function transform(tree) {
    function visit(node) {
      if (['link', 'image', 'definition'].includes(node.type) && typeof node.url === 'string') {
        node.url = withBasePath(node.url, base);
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
