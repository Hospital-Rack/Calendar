function get() {
    class a {
        b() {}
    }
    return a;
}

const x = get();
const y = new x();

y.b();
